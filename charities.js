const charities = [
  { name: 'Lifeline Australia', category: 'Mental health', description: '24/7 crisis support and suicide prevention services.', domain: 'lifeline.org.au' },
  { name: 'Beyond Blue', category: 'Mental health', description: 'Mental health information, support and counselling.', domain: 'beyondblue.org.au' },
  { name: 'Black Dog Institute', category: 'Mental health', description: 'Research and support for mental health and suicide prevention.', domain: 'blackdoginstitute.org.au' },
  { name: 'Kids Helpline', category: 'Mental health', description: 'Free, confidential counselling for young Australians.', domain: 'kidshelpline.com.au' },
  { name: 'Movember', category: 'Mental health', description: "Improving men's mental health and health outcomes.", domain: 'au.movember.com' },
  { name: 'The Smith Family', category: 'Children & education', description: 'Helping children experiencing disadvantage succeed at school.', domain: 'thesmithfamily.com.au' },
  { name: 'Indigenous Literacy Foundation', category: 'Children & education', description: 'Books and literacy programs for remote First Nations communities.', domain: 'indigenousliteracyfoundation.org.au' },
  { name: 'Variety Australia', category: 'Children & education', description: 'Practical support for children living with disadvantage.', domain: 'variety.org.au' },
  { name: 'Canteen Australia', category: 'Children & education', description: 'Support for young people affected by cancer.', domain: 'canteen.org.au' },
  { name: 'Make-A-Wish Australia', category: 'Children & education', description: 'Creating life-changing wishes for critically ill children.', domain: 'makeawish.org.au' },
  { name: 'Cancer Council Australia', category: 'Health & research', description: 'Cancer research, prevention, advocacy and support.', domain: 'cancer.org.au' },
  { name: 'McGrath Foundation', category: 'Health & research', description: 'Specialist cancer nurses supporting patients and families.', domain: 'mcgrathfoundation.com.au' },
  { name: 'Heart Foundation', category: 'Health & research', description: 'Research and action to reduce heart disease.', domain: 'heartfoundation.org.au' },
  { name: 'Dementia Australia', category: 'Health & research', description: 'Support, education and advocacy for people impacted by dementia.', domain: 'dementia.org.au' },
  { name: 'The Fred Hollows Foundation', category: 'Health & research', description: 'Restoring sight and ending avoidable blindness.', domain: 'hollows.org' },
  { name: 'Royal Flying Doctor Service', category: 'Health & research', description: 'Healthcare and emergency services across rural Australia.', domain: 'flyingdoctor.org.au' },
  { name: 'Australian Red Cross', category: 'Community', description: 'Humanitarian support through emergencies and hardship.', domain: 'redcross.org.au' },
  { name: 'Foodbank Australia', category: 'Community', description: 'Food relief for Australians experiencing food insecurity.', domain: 'foodbank.org.au' },
  { name: 'OzHarvest', category: 'Community', description: 'Rescuing food and delivering it to people in need.', domain: 'ozharvest.org' },
  { name: 'Orange Sky Australia', category: 'Community', description: 'Free laundry, showers and conversation for people doing it tough.', domain: 'orangesky.org.au' },
  { name: 'Mission Australia', category: 'Community', description: 'Housing, homelessness and community support services.', domain: 'missionaustralia.com.au' },
  { name: 'The Salvation Army Australia', category: 'Community', description: 'Practical care for people experiencing hardship and crisis.', domain: 'salvationarmy.org.au' },
  { name: 'St Vincent de Paul Society', category: 'Community', description: 'Assistance for people experiencing poverty and inequality.', domain: 'vinnies.org.au' },
  { name: 'World Vision Australia', category: 'Community', description: 'Community development and humanitarian assistance.', domain: 'worldvision.com.au' },
  { name: 'UNICEF Australia', category: 'Community', description: "Protecting children's rights, health and education.", domain: 'unicef.org.au' },
  { name: 'RSPCA Australia', category: 'Animals & environment', description: 'Preventing cruelty and improving animal welfare.', domain: 'rspca.org.au' },
  { name: 'WIRES', category: 'Animals & environment', description: 'Rescuing and caring for Australian wildlife.', domain: 'wires.org.au' },
  { name: 'Greening Australia', category: 'Animals & environment', description: 'Restoring landscapes and rebuilding biodiversity.', domain: 'greeningaustralia.org.au' },
  { name: 'Guide Dogs Australia', category: 'Animals & environment', description: 'Helping people with low vision live independently.', domain: 'guidedogs.com.au' },
  { name: 'Surf Life Saving Australia', category: 'Community', description: 'Keeping Australian beaches and communities safer.', domain: 'sls.com.au' }
];

const directory = document.querySelector('#charityDirectory');
const search = document.querySelector('#charitySearch');
const resultCount = document.querySelector('#resultCount');
const emptyState = document.querySelector('#emptyState');
let activeCategory = 'All';
let selectedCharity = '';

function logoUrl(domain) {
  return `https://www.google.com/s2/favicons?domain_url=https://${domain}&sz=128`;
}

function renderCharities() {
  const query = search.value.trim().toLowerCase();
  const filtered = charities.filter((charity) => {
    const categoryMatch = activeCategory === 'All' || charity.category === activeCategory;
    const queryMatch = `${charity.name} ${charity.description} ${charity.category}`.toLowerCase().includes(query);
    return categoryMatch && queryMatch;
  });

  directory.innerHTML = filtered.map((charity) => `
    <article class="directory-card${selectedCharity === charity.name ? ' selected' : ''}" data-name="${charity.name}">
      <div class="directory-logo"><img src="${logoUrl(charity.domain)}" alt="${charity.name} logo" loading="lazy" /><span>${charity.name.charAt(0)}</span></div>
      <span class="category-label">${charity.category}</span>
      <h3>${charity.name}</h3>
      <p>${charity.description}</p>
      <button type="button" class="select-charity" aria-pressed="${selectedCharity === charity.name}">${selectedCharity === charity.name ? 'Selected ✓' : 'Choose this charity →'}</button>
      <a class="charity-website" href="https://${charity.domain}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${charity.name} website">Visit website ↗</a>
    </article>
  `).join('');

  resultCount.textContent = filtered.length === charities.length ? 'Showing all 30 charities' : `Showing ${filtered.length} ${filtered.length === 1 ? 'charity' : 'charities'}`;
  emptyState.hidden = filtered.length > 0;
}

document.querySelectorAll('.filter-chip').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-chip.active')?.classList.remove('active');
    button.classList.add('active');
    activeCategory = button.dataset.category;
    renderCharities();
  });
});

search.addEventListener('input', renderCharities);

directory.addEventListener('click', (event) => {
  const selectButton = event.target.closest('.select-charity');
  if (!selectButton) return;
  selectedCharity = selectButton.closest('.directory-card').dataset.name;
  sessionStorage.setItem('selectedCharity', selectedCharity);
  renderCharities();
});

selectedCharity = sessionStorage.getItem('selectedCharity') || '';
renderCharities();
