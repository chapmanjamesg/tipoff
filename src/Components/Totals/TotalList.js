import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import APIManager from '../Module/APIManager'


export default class Total extends Component {

    state = {
        tips: [],
        data: {},
        month: {},
        hasInformation: false,
    }

    componentDidMount() {
        APIManager.getAll(`tips?userId=${JSON.parse(localStorage.getItem("credentials")).userId}`)
            .then((tips) => {
                const sortTips = tips.sort(function (a, b) {
                    let d1 = new Date(a.date), d2 = new Date(b.date)
                    return d1 - d2
                })
                const testingArray = []
                // let singleMonth = {} 
                let byYearAndByMonth = {};
                const monthDate = tips.filter(function (tips) {
                    const years = tips.date.substring(0, 4)
                    // console.log(years)
                    let months = tips.date.substring(5, 7)

                    if (typeof byYearAndByMonth[years] === "undefined") {
                        byYearAndByMonth[years] = {}
                    }
                    if (typeof byYearAndByMonth[years][months] === "undefined") {
                        byYearAndByMonth[years][months] = []
                    }
                    byYearAndByMonth[years][months].push(tips)

                })

                Object.keys(byYearAndByMonth).map(function (year) {
                    // console.log("year", year)
                    Object.entries(byYearAndByMonth[year]).map(function (month) {
                        // console.log("month", month);
                        testingArray.push(month)
                        // singleMonth = month
                    })
                })

                // testingArray.push(byYearAndByMonth[2019])
                // console.log("test",testingArray)
                // console.log(byYearAndByMonth)
                this.setState({
                    hasInformation: true,
                    tips: sortTips,
                    month: testingArray,
                    data: {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', "September", "October", "November", "December"],
                        dataSets: [
                            {
                                label: 'Tips by the Month',
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderCapStyle: 'butt',
                                borderDash: [],
                                borderDashOffset: 0.0,
                                borderJoinStyle: 'miter',
                                pointBorderColor: 'rgba(75,192,192,1)',
                                pointBackgroundColor: '#fff',
                                pointBorderWidth: 1,
                                pointHoverRadius: 5,
                                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                pointHoverBorderWidth: 2,
                                pointRadius: 1,
                                pointHitRadius: 10,
                                data: []
                            }

                        ],
                        options: {
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    }
                })
            })
    }



    render() {
        return (
            this.state.hasInformation ?
                <div>
                    <h2>Tips Chart for the Year</h2>
                    <Line data={this.state.data} />
                    {/* <this.addingMonths /> */}
                    {console.log(this.state.month[1])}
                    {/* {console.log(this.state.month[2019])}
                    {console.log(this.state.month[2019][12])} */}
                </div> :
                <div>
                    <h2>Tips Chart for the Year</h2>
                    <Line data={this.state.data} />
                    {console.log(this.state)}
                </div>
        );
    }
}

