const amountInput = document.querySelector('#loanAmount');
const loanType = document.querySelector('#loanType');
const rateInput = document.querySelector('#interestRate');
const impactOutput = document.querySelector('#impactAmount');
const trailImpactOutput = document.querySelector('#trailImpactAmount');
const impactLabel = document.querySelector('.impact-beneficiary');

function updateImpact() {
  const amount = Math.max(0, Number(amountInput.value) || 0);
  const rate = Math.max(0, Number(rateInput.value) || 0);
  const typeMultiplier = { home: 1, investment: 1.08, refinance: 0.88 }[loanType.value];
  // Illustrative estimate: 1% upfront and 0.15% annual trail commission, with 25% passed on.
  const rateAdjustment = 1 + ((rate - 6.14) * 0.015);
  const upfrontDonation = Math.round((amount * 0.01 * 0.25 * typeMultiplier * rateAdjustment) / 5) * 5;
  const monthlyTrailDonation = Math.round((amount * 0.0015 * 0.25 * typeMultiplier * rateAdjustment / 12) * 100) / 100;
  const currency = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  impactOutput.textContent = currency.format(upfrontDonation);
  trailImpactOutput.textContent = currency.format(monthlyTrailDonation);
  sessionStorage.setItem('loanAmount', String(amount));
}

[amountInput, loanType, rateInput].forEach((field) => field.addEventListener('input', updateImpact));

document.querySelectorAll('.charity-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelector('.charity-card.selected')?.classList.remove('selected');
    card.classList.add('selected');
    impactLabel.textContent = `to ${card.dataset.charity}`;
    sessionStorage.setItem('selectedCharity', card.dataset.charity);
  });
});

const savedCharity = sessionStorage.getItem('selectedCharity');
if (savedCharity) {
  impactLabel.textContent = `to ${savedCharity}`;
  document.querySelector('.charity-card.selected')?.classList.remove('selected');
  document.querySelectorAll('.charity-card').forEach((card) => {
    if (card.dataset.charity === savedCharity) card.classList.add('selected');
  });
}

updateImpact();
