
loginIf()

dataRender()
//
//
getData()
async function getData() {
  const res = await axios.get('/dashboard')
  const { year } = res.data.data
  const { salaryData } = res.data.data
  const { groupData }=res.data.data
  console.log(res);
  lineRender(year)
  pieRender(salaryData)
  groupRender(groupData)
  genderRender(salaryData)
  console.log(salaryData);
  const name={ label }=salaryData
  console.log(name);
}
function lineRender(year) {
  const option = {
    title: {
          text:'2022年学科收入分布'
        },
    xAxis: {
      data: year.map(ele => ele['month']),
      type:'',
        axisLine: {
        lineStyle: {
          color: '#ccc',
          type: 'dashed',
        },
      },
      axisLabel: {
        color: '#999',
      },
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle:'dashed'
        },
    },
    grid: {
      top: '20%',
    },
      color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#499FEE', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#5D75F0', // 100% 处的颜色
          },
        ],
      },
    ],
      series: [
        {
          data: year.map(ele=>ele['salary']),
          type: 'line',
          symbolSize: 10,
          lineStyle: {
            width: 5,
            
          },
          areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#499FEE',
            },
            {
              offset: 0.8,
              color: 'rgba(255,255,255,0.2)',
            },
            {
              offset: 1,
              color: 'rgba(255,255,255,0)',
            },
          ]),
        },
          smooth: true
        }
    ],
    tooltip: {
      show: true,
      trigger:'axis'
    },
    axisLabel: {
        color: '#999',
      },
    };
    const line = new echarts.init(document.querySelector('#line'))
    line.setOption(option)
}
function pieRender(salaryData) {
  const salary = new echarts.init(document.querySelector('#salary'))
  const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      title: {
        text: '班级薪资分布',
        bottom:0,
        textStyle: {
          fontSize: 16,
        },
        show:true
      },
      name: '班级薪资分布',
      type: 'pie',
      tooltip: {
        trriger:'item'
      },
      radius: ['50%', '64%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center'
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: 20,
      //     fontWeight: 'bold'
      //   }
      // },
      labelLine: {
        show: false
      },
      data: salaryData.map(ele => {
        return {
          value: ele.g_count + ele.b_count,
          name: ele.label,
        }
      })
    }
  ]
};
  salary.setOption(option)
}//？？？对象数组map应该如何处理
function groupRender(groupData) {
  // 初始化图表
  const myEchart = echarts.init(document.querySelector('#lines'))
  const option = {
    grid: {
      left: 70,
      top: 30,
      right: 30,
      bottom: 50,
    },
    xAxis: {
      type: 'category',
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'ooi'],
      data: groupData[1].map((item) => item.name),
      axisLine: {
        lineStyle: {
          color: '#ccc',
          type: 'dashed',//!!!
        },
      },
      axisLabel: {
        color: '#999',
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
        },
      },
    },
    tooltip: {
      trigger: 'item',
    },
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#34D39A', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(52,211,154,0.2)', // 100% 处的颜色
          },
        ],
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#499FEE', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(73,159,238,0.2)', // 100% 处的颜色
          },
        ],
      },
    ],
    series: [
      {
        // data: [12200, 17932, 13901, 13934, 21290, 23300, 13300, 13320],
        data: groupData[1].map((item) => item.hope_salary),
        type: 'bar',
        name: '期望薪资',
      },
      {
        // data: [22820, 19932, 16901, 15934, 31290, 13300, 14300, 18320],
        data: groupData[1].map((item) => item.salary),
        type: 'bar',
        name: '就业薪资',
      },
    ],
  }
  myEchart.setOption(option)
  const btns = document.querySelector('#btns')
  btns.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      btns.querySelector('.btn-blue')?.classList.remove('btn-blue')
      e.target.classList.add('btn-blue')
      const group = e.target.innerText
      // 切换数据
      option.xAxis.data = groupData[group].map((item) => item.name)
      option.series[0].data = groupData[group].map((item) => item.hope_salary)
      option.series[1].data = groupData[group].map((item) => item.salary)
      myEchart.setOption(option)
    }
  })
}
function genderRender(salaryData){
  const myEchart = echarts.init(document.querySelector('#gender'))
  myEchart.setOption({
    title: [
      {
        text: '男女薪资分布',
        left: 10,
        top: 10,
        textStyle: {
          fontSize: 16,
        },
      },
      {
        text: '男生',
        left: '50%',
        top: '45%',
        textAlign: 'center',
        textStyle: {
          fontSize: 12,
        },
      },
      {
        text: '女生',
        left: '50%',
        top: '85%',
        textAlign: 'center',
        textStyle: {
          fontSize: 12,
        },
      },
    ],
    color: ['#FDA224', '#5097FF', '#3ABCFA', '#34D39A'],
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: 50,
        radius: ['20%', '30%'],
        center: ['50%', '30%'],
        datasetIndex: 1,
        // data: [{name:'1万以下',value: 4},...]
        data: salaryData.map((item) => ({ name: item.label, value: item.b_count })),
      },
      {
        type: 'pie',
        radius: 50,
        radius: ['20%', '30%'],
        center: ['50%', '70%'],
        datasetIndex: 2,
        // data: [{name:'1万以下',value: 4},...]
        data: salaryData.map((item) => ({ name: item.label, value: item.g_count })),
      },
    ],
  })
}