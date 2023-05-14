window.onload = function() {
  // Fetch the CSV file using the Fetch API
  fetch('https://cors-anywhere.herokuapp.com/https://github.com/rannej13/Test/blob/master/SchoolProject2/SchoolResultsAberdeen.csv')
    .then(response => response.text())
    .then(data => {
      // Parse the CSV data using Papa Parse
      const parsedData = Papa.parse(data, { header: true }).data;

      // Get the unique establishments from the parsed data
      const establishments = [...new Set(parsedData.map(row => row['Reference Establishment']))];

      // Create a reference to the canvas element in the HTML
      const canvas = document.getElementById('myChart');

      // Create a new Chart object and specify the type of chart
      const chart = new Chart(canvas, {
        type: 'bar',

        // Set the chart data
        data: {
          labels: establishments,
          datasets: [{
            label: 'Academic Year 2021-22',
            data: parsedData.map(row => {
              const value = parseInt(row['Academic year 2021-22']);
              return isNaN(value) || value === null ? 0 : value;
            }),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },

        // Set chart options, including dynamic filter for establishments
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }],
            xAxes: [{
              ticks: {
                autoSkip: false
              }
            }]
          },
          plugins: {
            datalabels: {
              display: false
            },
            multiSelectFilter: {
              options: establishments,
              isResetDisabled: true,
              buttonText: 'Filter Establishments',
              textTitle: 'Establishments',
              onFilter: (chart, values) => {
                chart.data.labels = values;
                chart.update();
              }
            }
          }
        }
      });
    });
};
