function formatDate(date) {
    return date.toLocaleString();
  }
  
  function displayTimestamp(timestampElement, date) {
    timestampElement.textContent = formatDate(date);
  }
  
  function displayDonationDetails(dataString, detailsElement) {
    const dataArray = dataString.split('\n');
    dataArray.forEach(donation => {
      const newParagraph = document.createElement('p');
      newParagraph.classList.add('donation-row');
      newParagraph.textContent = donation;
      detailsElement.appendChild(newParagraph);
    });
  }