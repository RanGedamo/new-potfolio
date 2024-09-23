const API_URL = 'https://www.oref.org.il/WarningMessages/alert/alerts.json';
const UPDATE_INTERVAL = 5000; // עדכון כל 5 שניות

// פונקציה לקבלת התרעות
async function fetchAlerts() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // אם נדרש מפתח API, הוסף אותו כאן
        // 'Authorization': 'Bearer YOUR_API_KEY'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return null;
  }
}

// פונקציה להצגת התרעות
function displayAlerts(alerts) {
  const alertContainer = document.getElementById('alert-container');
  alertContainer.innerHTML = ''; // ניקוי התרעות קודמות

  if (alerts && alerts.length > 0) {
    alerts.forEach(alert => {
      const alertElement = document.createElement('div');
      alertElement.classList.add('alert');
      alertElement.textContent = `התרעה: ${alert.data} - ${alert.desc}`;
      alertContainer.appendChild(alertElement);
    });
  } else {
    alertContainer.textContent = 'אין התרעות כרגע';
  }
}

// פונקציה ראשית לעדכון התרעות
async function updateAlerts() {
  const alerts = await fetchAlerts();
  displayAlerts(alerts);
}

// התחלת עדכון מחזורי
setInterval(updateAlerts, UPDATE_INTERVAL);

// עדכון ראשוני
updateAlerts();