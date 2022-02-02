reportData = {};
config = {
  type: "line",
  options: {},
};

window.onload = () => {
  this.getReportData().then(() => {
    const dates = getDates();
    console.log(reportData);

    new Chart(numberOfConnections, {
      ...config,
      data: {
        labels: dates,
        datasets: [
          {
            label: "Number of connections",
            backgroundColor: "red",
            borderColor: "red",
            data: reportData.NUMBER_OF_CONNECTIONS,
          },
        ],
      },
    });

    new Chart(articleViews, {
      ...config,
      data: {
        labels: dates,
        datasets: [
          {
            label: "Article views",
            backgroundColor: "green",
            borderColor: "green",
            data: reportData.ARTICLE_VIEWS,
          },
        ],
      },
    });

    new Chart(profileViews, {
      ...config,
      data: {
        labels: dates,
        datasets: [
          {
            label: "Profile views",
            backgroundColor: "blue",
            borderColor: "blue",
            data: reportData.PROFILE_VIEWS,
          },
        ],
      },
    });

    new Chart(searchAppearances, {
      ...config,
      data: {
        labels: dates,
        datasets: [
          {
            label: "Search appearances",
            backgroundColor: "orange",
            borderColor: "orange",
            data: reportData.SEARCH_APPEARANCES,
          },
        ],
      },
    });
  });
};

function getReportData() {
  return new Promise((resolve, reject) => {
    fetch("/reports/report.txt")
      .then((res) => res.text())
      .then((data) => {
        processData(data);
        resolve();
      });
  });
}

function processData(data) {
  const lines = data.split("\n");

  lines.forEach((line) => {
    const infoArray = line.split(";").filter(Boolean);

    infoArray.forEach((info) => {
      const infoArray = info.split(":");

      if (reportData[infoArray[0]]) {
        return reportData[infoArray[0]].push(infoArray[1]);
      }

      reportData[infoArray[0]] = [infoArray[1]];
    });
  });
}

function getDates() {
  const dates = reportData.REPORT_TIME;

  return dates.map((date) => {
    date = date.replace(/#/g, ":");
    return new Date(date).toLocaleString("en-US");
  });
}

function newDate(pDate) {
  let dd = pDate.split("/")[0].padStart(2, "0");
  let mm = pDate.split("/")[1].padStart(2, "0");
  let yyyy = pDate.split("/")[2].split(" ")[0];
  let hh = pDate.split("/")[2].split(" ")[1].split(":")[0].padStart(2, "0");
  let mi = pDate.split("/")[2].split(" ")[1].split(":")[1].padStart(2, "0");
  let secs = pDate.split("/")[2].split(" ")[1].split(":")[2].padStart(2, "0");

  mm = (parseInt(mm) - 1).toString(); // January is 0

  return new Date(yyyy, mm, dd, hh, mi, secs);
}
