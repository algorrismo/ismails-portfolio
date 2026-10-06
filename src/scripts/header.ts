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
  group.toggle.addEventListener('click', () => group.panel.hidden ? openGroup(group) : setOpen(group, false));
  group.root.addEventListener('focusout', event => {
    if (!group.root.contains(event.relatedTarget as Node)) setOpen(group, false);
  });
  group.root.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const items = Array.from(group.panel.querySelectorAll<HTMLElement>('a, button'));
    if (group.panel.hidden) {
      openGroup(group);
      (event.key === 'ArrowUp' || event.key === 'End' ? items.at(-1) : items[0])?.focus();
      return;
    }
    const index = items.indexOf(document.activeElement as HTMLElement);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 :
      event.key === 'ArrowDown' ? (index + 1) % items.length : (index <= 0 ? items.length - 1 : index - 1);
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
const choices = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-theme-choice]'));
const themeIcons = Array.from(document.querySelectorAll<HTMLElement>('[data-theme-icon]'));
const media = matchMedia('(prefers-color-scheme: dark)');
let preference = 'system';
try {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved && ['light', 'dark', 'system'].includes(saved)) preference = saved;
} catch {}
function syncTheme() {
  const dark = preference === 'dark' || (preference === 'system' && media.matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111111' : '#fcfcfc');
  choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === preference)));
  themeIcons.forEach(icon => icon.hidden = icon.dataset.themeIcon !== preference);
  document.querySelector('#appearance-toggle')?.setAttribute('title', `Appearance: ${preference}`);
}
syncTheme();
media.addEventListener('change', syncTheme);
choices.forEach(button => button.addEventListener('click', () => {
  preference = button.dataset.themeChoice!;
  try { localStorage.setItem('portfolio-theme', preference); } catch {}
  syncTheme();
  const appearance = groups.find(group => group.root.dataset.dropdown === 'appearance')!;
  setOpen(appearance, false, true);
}));
