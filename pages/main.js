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
            data: reportData.POST_VIEWS,
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
    date = new Date(date);

    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const hour = date.getUTCHours();
    const minute = date.getUTCMinutes();

    return `${month}/${day} ${hour}:${minute}`;
  });
}
