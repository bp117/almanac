// Mock Bank Data
const banks = [
  {
    name: "Global Bank",
    location: "New York, USA",
    contact: "123-456-7890",
    assets: "$500B",
    correspondents: ["Bank of America", "JPMorgan Chase"],
    offices: ["Los Angeles, USA", "Chicago, USA", "Paris, France"],
    about: "Leading international financial institution with operations in over 50 countries.",
    bicCodes: [
      { bic: "GLBNUS01", branch: "Main Office", country: "USA" },
      { bic: "GLBNUS02", branch: "West Coast", country: "USA" },
      { bic: "GLBNJP01", branch: "Tokyo Office", country: "Japan" },
      { bic: "GLBNFR01", branch: "Paris Branch", country: "France" },
    ]
  },
  {
    name: "Continental Bank",
    location: "London, UK",
    contact: "987-654-3210",
    assets: "$300B",
    correspondents: ["HSBC", "Barclays"],
    offices: ["Manchester, UK", "Edinburgh, UK"],
    about: "Major European financial institution with a focus on retail and corporate banking.",
    bicCodes: [
      { bic: "CNTLUK01", branch: "Head Office", country: "UK" },
      { bic: "CNTLUK02", branch: "Regional Office", country: "UK" },
    ]
  },
  {
    name: "Pacific Bank",
    location: "Tokyo, Japan",
    contact: "+81-1234-5678",
    assets: "¥50T",
    correspondents: ["Mizuho Bank", "Sumitomo Mitsui Banking Corporation"],
    offices: ["Osaka, Japan", "Nagoya, Japan"],
    about: "A premier Japanese financial institution providing innovative solutions.",
    bicCodes: [
      { bic: "PACBJP01", branch: "Tokyo HQ", country: "Japan" },
      { bic: "PACBJP02", branch: "Osaka Branch", country: "Japan" },
    ]
  }
];

function viewProfile(bankName) {
  const bank = banks.find(b => b.name === bankName);
  if (bank) {
    localStorage.setItem("selectedBank", JSON.stringify(bank));
    window.location.href = "profile.html";
  } else {
    alert("Bank not found!");
  }
}

// Search Functionality
if (document.getElementById("searchBtn")) {
  document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const results = banks.filter(bank =>
      bank.name.toLowerCase().includes(query) || bank.location.toLowerCase().includes(query)
    );

    const resultsContainer = document.getElementById("searchResults");
    resultsContainer.innerHTML = results.length
      ? results.map(bank => `
          <div class="result-item">
            <h3 onclick="viewProfile('${bank.name}')">${bank.name}</h3>
            <p><strong>Location:</strong> ${bank.location}</p>
            <p><strong>Assets:</strong> ${bank.assets}</p>
          </div>
        `).join("")
      : "<p>No results found.</p>";
  });
}

// Tab Switching Functionality
function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  const buttons = document.querySelectorAll(".tab-button");
  tabs.forEach(tab => tab.classList.remove("active"));
  buttons.forEach(button => button.classList.remove("active"));
  document.getElementById(tabId).classList.add("active");
  document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add("active");
}

// Populate Profile Data
if (document.getElementById("bankName")) {
  const bank = JSON.parse(localStorage.getItem("selectedBank"));

  if (!bank) {
    alert("No bank selected! Redirecting to search page.");
    window.location.href = "search.html";
  }

  // Populate Details Tab
  document.getElementById("bankName").innerText = bank.name;
  document.getElementById("bankLocation").innerText = bank.location;
  document.getElementById("bankContact").innerText = bank.contact;
  document.getElementById("bankAssets").innerText = bank.assets;

  // Populate Correspondents Tab
  const correspondentsList = document.getElementById("correspondents");
  if (correspondentsList) {
    correspondentsList.querySelector("ul").innerHTML = bank.correspondents.map(correspondent => `<li>${correspondent}</li>`).join("");
  }

  // Populate Other Offices Tab
  const officesList = document.getElementById("offices");
  if (officesList) {
    officesList.querySelector("ul").innerHTML = bank.offices.map(office => `<li>${office}</li>`).join("");
  }

  // Populate About Tab
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    aboutSection.querySelector("p").innerText = bank.about;
  }

  // Populate BIC Codes Table
  const bicTableBody = document.getElementById("bicTableBody");
  if (bicTableBody) {
    bicTableBody.innerHTML = bank.bicCodes.map(bic => `
      <tr>
        <td>${bic.bic}</td>
        <td>${bic.branch}</td>
        <td>${bic.country}</td>
      </tr>
    `).join("");
  }
}