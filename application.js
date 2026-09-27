const form = document.querySelector('#applicationForm');
const charityField = document.querySelector('#applicationCharity');
const loanAmountField = document.querySelector('#applicationLoanAmount');

const savedCharity = sessionStorage.getItem('selectedCharity');
const savedLoanAmount = sessionStorage.getItem('loanAmount');
if (savedCharity && [...charityField.options].some((option) => option.value === savedCharity)) charityField.value = savedCharity;
if (savedLoanAmount && Number(savedLoanAmount) > 0) loanAmountField.value = savedLoanAmount;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  document.querySelector('#successName').textContent = data.get('fullName').split(' ')[0] || 'there';
  document.querySelector('#formView').hidden = true;
  document.querySelector('#formSuccess').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
