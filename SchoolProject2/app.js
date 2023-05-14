

// // Define the CSV file path
// // const csvFilePath = 'https://github.com/rannej13/Test/blob/main/SchoolResultsAberdeen.csv';

// // Fetch the CSV file using the Fetch API
//     Papa.parse("https://github.com/rannej13/Test/blob/master/SchoolProject2/SchoolResultsAberdeen.csv", {
//       download: true,
//       header: true,
//       dynamicTyping: true,
//       complete: function(results) {
//         var data = processData(results.data);

//         var ctx = document.getElementById('myChart').getContext('2d');
//         var chart = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: data.labels,
//             datasets: data.datasets
//           }
//         });
//       }
//     });

//     function processData(data) {
//       var labels = Object.keys(data[0]).slice(1);
//       var datasets = [];

//       data.forEach(function(row) {
//         var label = row[Object.keys(row)[0]];
//         var values = Object.values(row).slice(1);
//         var dataset = {
//           label: label,
//           data: values,
//           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//           borderColor: 'rgba(255, 99, 132, 1)',
//           borderWidth: 1
//         };
//         datasets.push(dataset);
//       });

//       return { labels: labels, datasets: datasets };
//     }


		// Fetch CSV file
		fetch('https://github.com/rannej13/Test/blob/master/SchoolProject2/SchoolResultsAberdeen.csv')
			.then(response => response.text())
			.then(csv => {
				// Parse CSV data
				const data = Papa.parse(csv, { header: true }).data;
				
				// Get all establishments from CSV data
				const establishments = data.reduce((acc, row) => {
					if (!acc.includes(row['Reference Establishment'])) {
						acc.push(row['Reference Establishment']);
					}
					return acc;
				}, []);
				
				// Populate establishment filter
				const establishmentFilter = document.getElementById('establishment-filter');
				establishments.forEach(establishment => {
					const option = document.createElement('option');
					option.value = establishment;
					option.text = establishment;
					establishmentFilter.add(option);
				});
				
				// Initialize chart with all data
				const ctx = document.getElementById('chart').getContext('2d');
				const chart = new Chart(ctx, {
					type: 'bar',
					data: {
						labels: data.map(row => row['Reference Establishment']),
						datasets: [{
							label: 'Academic Year 2021-22',
							data: data.map(row => row['Academic Year 2021-22']),
							backgroundColor: 'rgba(255, 99, 132, 0.2)',
							borderColor: 'rgba(255, 99, 132, 1)',
							borderWidth: 1
						}]
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				});
				
				// Update chart data based on establishment filter
				establishmentFilter.addEventListener('change', () => {
					const selectedEstablishments = Array.from(establishmentFilter.selectedOptions)
						.map(option => option.value);
					const filteredData = data.filter(row => selectedEstablishments.includes(row['Reference Establishment']));
					chart.data.labels = filteredData.map(row => row['Reference Establishment']);
					chart.data.datasets[0].data = filteredData.map(row => row['Academic Year 2021-22']);
					chart.update();
				});
			})
			.catch(error => console.error(error));



   
   
  

  
          
      
