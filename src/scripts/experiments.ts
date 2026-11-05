const experiment = document.querySelector<HTMLElement>('[data-experiment]');
if (experiment) {
  const home = experiment.querySelector<HTMLElement>('[data-experiment-home]')!;
  const panels = Array.from(experiment.querySelectorAll<HTMLElement>('[data-experiment-panel]'));
  const shortcuts: Record<string, string> = { w: 'work', g: 'garden', s: 'services', r: 'resources', b: 'writing' };
  let activePanel = '';
  let homeScroll = 0;
  let returnTarget: HTMLElement | null = null;
  function renderSection(focus = true) {
    const id = location.hash.slice(1);
    const panel = panels.find(item => item.id === id);
    const wasDetail = Boolean(activePanel);
    activePanel = panel?.id ?? '';
    home.hidden = Boolean(panel);
    panels.forEach(item => item.hidden = item !== panel);
    experiment!.classList.toggle('is-detail', Boolean(panel));
    if (panel) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (focus) panel.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
    } else if (wasDetail) {
      window.scrollTo({ top: homeScroll, behavior: 'instant' });
      if (focus) (returnTarget ?? home.querySelector<HTMLElement>('h2'))?.focus({ preventScroll: true });
    }
  }
  function navigate(id: string) {
    if (id === activePanel) return;
    if (!activePanel) {
      homeScroll = window.scrollY;
      returnTarget = document.activeElement instanceof HTMLElement && home.contains(document.activeElement)
        ? document.activeElement : null;
    }
    const url = new URL(location.href);
    url.hash = id;
    history.pushState(null, '', url);
    renderSection();
  }
  experiment.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
    if (!link) return;
    const id = link.hash.slice(1);
    if (id && !panels.some(panel => panel.id === id)) return;
    event.preventDefault();
    navigate(id);
  });
  renderSection(false);
  window.addEventListener('hashchange', () => renderSection());
  window.addEventListener('popstate', () => renderSection());
  document.addEventListener('keydown', event => {
    const target = event.target;
    if (event.defaultPrevented || event.repeat || event.isComposing || event.ctrlKey || event.metaKey ||
      (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [role="textbox"]')))) return;
    if (event.key === 'Escape' && activePanel) {
      event.preventDefault();
      navigate('');
    } else if (event.altKey && event.shiftKey && shortcuts[event.key.toLowerCase()]) {
      event.preventDefault();
      navigate(shortcuts[event.key.toLowerCase()]);
    }
  });
  const bioToggle = experiment.querySelector<HTMLButtonElement>('[data-bio-toggle]')!;
  const bio = experiment.querySelector<HTMLElement>('#extra-bio')!;
  function toggleBio() {
    bio.hidden = !bio.hidden;
    bioToggle.setAttribute('aria-expanded', String(!bio.hidden));
    bioToggle.setAttribute('aria-label', bio.hidden ? 'Reveal more about me' : 'Hide extra biography');
  }
  bioToggle.hidden = false;
  bioToggle.addEventListener('click', toggleBio);
  experiment.querySelector<HTMLElement>('[data-resource-controls]')!.hidden = false;
  const filters = Array.from(experiment.querySelectorAll<HTMLButtonElement>('[data-resource-filter]'));
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
    experiment.querySelectorAll<HTMLElement>('[data-resource-group]').forEach(group => {
      group.hidden = button.dataset.resourceFilter !== 'all' && group.dataset.resourceGroup !== button.dataset.resourceFilter;
    });
  }));
  const slides = Array.from(experiment.querySelectorAll<HTMLElement>('[data-work-slide]'));
  const workCard = experiment.querySelector<HTMLElement>('.work-card')!;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const carouselToggle = experiment.querySelector<HTMLButtonElement>('[data-carousel-toggle]')!;
  const carouselIcons = Array.from(carouselToggle.querySelectorAll<HTMLElement>('[data-carousel-icon]'));
  let currentSlide = 0;
  let carouselPaused = false;
  let carouselTimer: ReturnType<typeof setInterval> | undefined;
  function configureCarousel() {
    clearInterval(carouselTimer);
    carouselToggle.hidden = reducedMotion.matches || slides.length < 2;
    carouselToggle.setAttribute('aria-label', carouselPaused ? 'Resume project preview' : 'Pause project preview');
    carouselIcons.forEach(icon => icon.hidden = icon.dataset.carouselIcon !== (carouselPaused ? 'play' : 'pause'));
    if (reducedMotion.matches || carouselPaused || slides.length < 2) return;
    carouselTimer = setInterval(() => {
      if (home.hidden || document.hidden || workCard.parentElement!.matches(':hover, :focus-within')) return;
      slides[currentSlide].classList.remove('is-active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('is-active');
    }, 5500);
  }
  carouselToggle.addEventListener('click', () => {
    carouselPaused = !carouselPaused;
    configureCarousel();
  });
  configureCarousel();
  reducedMotion.addEventListener('change', configureCarousel);
}
