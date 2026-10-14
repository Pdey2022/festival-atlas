(() => {
  const form = document.getElementById('destination-filters');
  if (!form) return;
  const search = document.getElementById('destination-search');
  const region = document.getElementById('destination-region');
  const count = document.getElementById('destination-count');
  const empty = document.getElementById('destination-empty');
  const nav = document.getElementById('destination-regions');
  const normalize = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const groups = [...document.querySelectorAll('[data-destination-region]')].map(section => ({
    section,
    name: section.dataset.destinationRegion,
    entries: [...section.querySelectorAll('[data-destination-entry]')].map(element => ({
      element,
      text: normalize(element.dataset.search),
      jump: section.querySelector('[data-destination-jump="' + element.dataset.destinationEntry + '"]')
    }))
  }));
  const total = groups.reduce((sum, group) => sum + group.entries.length, 0);
  function render() {
    const terms = normalize(search.value).split(' ').filter(Boolean);
    let visible = 0;
    for (const group of groups) {
      let matches = 0;
      for (const entry of group.entries) {
        const show = (!region.value || region.value === group.name) && terms.every(term => entry.text.includes(term));
        entry.element.hidden = !show;
        if (entry.jump) entry.jump.hidden = !show;
        if (show) matches++;
      }
      group.section.hidden = matches === 0;
      const link = nav.querySelector('[href="#' + group.section.getAttribute('aria-labelledby') + '"]');
      if (link) {
        link.hidden = matches === 0;
        link.textContent = group.name + ' · ' + matches;
      }
      visible += matches;
    }
    nav.hidden = visible === 0;
    empty.hidden = visible !== 0;
    count.textContent = visible + ' of ' + total + ' destinations' + (region.value ? ' · ' + region.value : '');
  }
  form.hidden = false;
  form.addEventListener('submit', event => event.preventDefault());
  search.addEventListener('input', render);
  region.addEventListener('change', render);
  form.addEventListener('reset', event => {
    event.preventDefault();
    search.value = '';
    region.value = '';
    render();
    search.focus();
  });
  render();
})();
