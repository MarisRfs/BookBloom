    const ctx = document.getElementById('graficoVendas').getContext('2d');
    const grafico = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Vendas Mensais',
          data: [120, 190, 300, 250, 280, 320],
          backgroundColor: '#812f3f'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });



    