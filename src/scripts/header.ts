const groups = Array.from(document.querySelectorAll<HTMLElement>('[data-dropdown]')).map(root => ({
  root,
  toggle: root.querySelector<HTMLButtonElement>('[data-dropdown-toggle]')!,
  panel: root.querySelector<HTMLElement>('[data-dropdown-panel]')!,
}));
function setOpen(group: typeof groups[number], open: boolean, returnFocus = false) {
  group.panel.hidden = !open;
  group.toggle.setAttribute('aria-expanded', String(open));
  const name = group.toggle.dataset.dropdownLabel;
  group.toggle.setAttribute('aria-label', `${open ? 'Close' : 'Open'} ${name}`);
  if (returnFocus) group.toggle.focus();
}
function openGroup(group: typeof groups[number]) {
  groups.forEach(other => setOpen(other, other === group));
}
groups.forEach(group => {
  group.toggle.hidden = false;
  if (group.root.dataset.dropdown === 'navigation') {
    group.root.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) openGroup(group);
    });
    group.root.addEventListener('pointerleave', event => {
      if (event.pointerType === 'mouse' && !group.panel.contains(document.activeElement)) setOpen(group, false);
    });
  }
  group.toggle.addEventListener('click', () => group.panel.hidden ? openGroup(group) : setOpen(group, false));
  group.root.addEventListener('focusout', event => {
    if (!group.root.contains(event.relatedTarget as Node)) setOpen(group, false);
  });
  group.root.addEventListener('keydown', event => {
    const key = group.root.dataset.placement === 'left'
      ? ({ ArrowRight: 'ArrowDown', ArrowLeft: 'ArrowUp' }[event.key] ?? event.key)
      : event.key;
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(key)) return;
    event.preventDefault();
    const items = Array.from(group.panel.querySelectorAll<HTMLElement>('a, button'));
    if (group.panel.hidden) {
      openGroup(group);
      (key === 'ArrowUp' || key === 'End' ? items.at(-1) : items[0])?.focus();
      return;
    }
    const index = items.indexOf(document.activeElement as HTMLElement);
    const next = key === 'Home' ? 0 : key === 'End' ? items.length - 1 :
      key === 'ArrowDown' ? (index + 1) % items.length : (index <= 0 ? items.length - 1 : index - 1);
    items[next]?.focus();
  });
});
document.addEventListener('click', event => {
  groups.forEach(group => { if (!group.root.contains(event.target as Node)) setOpen(group, false); });
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  const open = groups.find(group => !group.panel.hidden);
  if (open) { event.preventDefault(); setOpen(open, false, true); }
});
const themeToggles = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]'));
const themeIcons = Array.from(document.querySelectorAll<HTMLElement>('[data-theme-icon]'));
const media = matchMedia('(prefers-color-scheme: dark)');
let preference = 'system';
try {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved && ['light', 'dark', 'system'].includes(saved)) preference = saved;
} catch {}
function syncTheme() {
  const dark = preference === 'dark' || (preference === 'system' && media.matches);
  const activeTheme = dark ? 'dark' : 'light';
  document.documentElement.dataset.theme = activeTheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111111' : '#fcfcfc');
  themeIcons.forEach(icon => icon.hidden = icon.dataset.themeIcon !== activeTheme);
  themeToggles.forEach(button => {
    const label = `Switch to ${dark ? 'light' : 'dark'} mode`;
    button.setAttribute('aria-label', label);
    button.hidden = false;
  });
}
syncTheme();
media.addEventListener('change', syncTheme);
function toggleTheme() {
  preference = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('portfolio-theme', preference); } catch {}
  syncTheme();
}
themeToggles.forEach(button => button.addEventListener('click', toggleTheme));
document.addEventListener('keydown', event => {
  if (event.defaultPrevented || event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || event.key.toLowerCase() !== 't') return;
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [role="textbox"]'))) return;
  event.preventDefault();
  toggleTheme();
});
