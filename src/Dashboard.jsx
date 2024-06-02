// // src/Dashboard.js
// import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
// import datafile from './eve.json';
// import Navbar from './Navbar';
// import './Dashboard.css';

// const Dashboard = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         // Simulate fetching data
//         setData(datafile);
//     }, []);

//     if (data.length === 0) return <div>Loading...</div>;

//     // Process data for plots
//     const df = data.map(item => ({
//         timestamp: new Date(item.timestamp),
//         category: item.alert ? item.alert.category : null,
//         src_ip: item.src_ip,
//         dest_ip: item.dest_ip,
//         dest_port: item.dest_port,
//     }));

//     // Filter out items without a category
//     const filteredDf = df.filter(item => item.category);

//     // Create data for plots
//     const alertsByTime = filteredDf.reduce((acc, item) => {
//         const date = item.timestamp.toISOString().split('T')[0];
//         acc[date] = (acc[date] || 0) + 1;
//         return acc;
//     }, {});

//     const alertsByCategory = filteredDf.reduce((acc, item) => {
//         acc[item.category] = (acc[item.category] || 0) + 1;
//         return acc;
//     }, {});

//     const alertsBySrcIp = filteredDf.reduce((acc, item) => {
//         acc[item.src_ip] = (acc[item.src_ip] || 0) + 1;
//         return acc;
//     }, {});

//     const alertsByDestPort = filteredDf.reduce((acc, item) => {
//         acc[item.dest_port] = (acc[item.dest_port] || 0) + 1;
//         return acc;
//     }, {});


//     const layout = {
//         title: {
//             font: {
//                 family: 'Arial, sans-serif',
//                 size: 24,
//                 color: '#ffffff'
//             }
//         },
//         showlegend: true,
//         legend: {
//             x: 1,
//             y: 1,
//             bgcolor: 'rgba(255,255,255,0.5)',
//             bordercolor: '#ffffff',
//             font: {
//                 family: 'Arial, sans-serif',
//                 size: 12,
//                 color: '#ffffff'
//             }
//         },
//         autosize: true,
//         xaxis: {
//             title: {
//                 font: {
//                     family: 'Arial, sans-serif',
//                     size: 14,
//                     color: '#ffffff'
//                 }
//             },
//             showgrid: true,
//             gridcolor: '#444444',
//             zeroline: true,
//             zerolinecolor: '#ffffff',
//             showline: true,
//             linecolor: '#ffffff',
//             tickmode: 'auto',
//             ticks: 'outside'
//         },
//         yaxis: {
//             title: {
//                 font: {
//                     family: 'Arial, sans-serif',
//                     size: 14,
//                     color: '#ffffff'
//                 }
//             },
//             showgrid: true,
//             gridcolor: '#444444',
//             zeroline: true,
//             zerolinecolor: '#ffffff',
//             showline: true,
//             linecolor: '#ffffff',
//             tickmode: 'auto',
//             ticks: 'outside'
//         },
//         margin: {
//             l: 50,
//             r: 50,
//             b: 50,
//             t: 50,
//             pad: 4
//         },
//         paper_bgcolor: '#1a1a1a',
//         plot_bgcolor: '#1a1a1a',
//         font: {
//             family: 'Arial, sans-serif',
//             size: 12,
//             color: '#ffffff'
//         },
//         hovermode: 'closest',
//         hoverlabel: {
//             bgcolor: '#333333',
//             bordercolor: '#ffffff',
//             font: {
//                 family: 'Arial, sans-serif',
//                 size: 12,
//                 color: '#ffffff'
//             }
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <Navbar />
//             <div className='plots'>
//                 <h1>Network Alerts Dashboard</h1>
//                 <a id="dashboard"></a>
//                 <Plot
//                     data={[
//                         {
//                             x: Object.keys(alertsByTime),
//                             y: Object.values(alertsByTime),
//                             type: 'scatter',
//                             mode: 'lines+markers',
//                             marker: { color: 'red' },
//                         },
//                     ]}
//                     layout={{
//                         ...layout,
//                         title: 'Time Series of Alerts',
//                         xaxis: {
//                             title: {
//                                 text: 'Time',
//                             }
//                         },
//                         yaxis: {
//                             title: {
//                                 text: 'Number of Alerts',
//                             }
//                         },
//                     }}
//                 />
//                 <a id="time-series"></a>
//                 <Plot
//                     data={[
//                         {
//                             x: Object.keys(alertsByCategory),
//                             y: Object.values(alertsByCategory),
//                             type: 'bar',
//                             marker: { color: 'blue' },
//                         },
//                     ]}
//                     layout={{
//                         title: 'Alerts by Category',
//                         ...layout,
//                         xaxis: {
//                             title: {
//                                 text: 'Categories',
//                             }
//                         },
//                         yaxis: {
//                             title: {
//                                 text: 'Number of Alerts',
//                             }
//                         },
//                     }}
//                 />
//                 <a id="alerts-category"></a>
//                 <Plot
//                     data={[
//                         {
//                             x: Object.keys(alertsBySrcIp),
//                             y: Object.values(alertsBySrcIp),
//                             type: 'bar',
//                             marker: { color: 'green' },
//                         },
//                     ]}
//                     layout={{
//                         ...layout,
//                         title: 'Top Source IPs',
//                         xaxis: {
//                             title: {
//                                 text: 'IP addresses',
//                                 font : {
//                                     color: 'red'
//                                 }
//                             }
//                         },
//                         yaxis: {
//                             title: {
//                                 text: 'Number of Alerts',
//                             }
//                         },
//                         margin: {
//                             l: 50,
//                             r: 50,
//                             b: 150,
//                             t: 50,
//                             pad: 4
//                         },
//                     }}
//                 />
//                 <a id="source-ips"></a>
//                 <Plot
//                     data={[
//                         {
//                             x: Object.keys(alertsByDestPort),
//                             y: Object.values(alertsByDestPort),
//                             type: 'bar',
//                             marker: { color: 'orange' },
//                         },
//                     ]}
//                     layout={{
//                         title: 'Top Destination Ports',
//                         ...layout,
//                         xaxis: {
//                             title: {
//                                 text: 'Ports',
//                             }
//                         },
//                         yaxis: {
//                             title: {
//                                 text: 'Number of Alerts',
//                             }
//                         },
//                     }}
//                 />
//                 <a id="destination-ports"></a>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

// src/Dashboard.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import datafile from './eve.json';
import './Dashboard.css';

const Dashboard = ({ activeSection }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(datafile);
    }, []);

    if (data.length === 0) return <div>Loading...</div>;

    const df = data.map(item => ({
        timestamp: new Date(item.timestamp),
        category: item.alert ? item.alert.category : null,
        src_ip: item.src_ip,
        dest_ip: item.dest_ip,
        dest_port: item.dest_port,
    }));

    const filteredDf = df.filter(item => item.category);

    const alertsByTime = filteredDf.reduce((acc, item) => {
        const date = item.timestamp.toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const alertsByCategory = filteredDf.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
    }, {});

    const alertsBySrcIp = filteredDf.reduce((acc, item) => {
        acc[item.src_ip] = (acc[item.src_ip] || 0) + 1;
        return acc;
    }, {});

    const alertsByDestPort = filteredDf.reduce((acc, item) => {
        acc[item.dest_port] = (acc[item.dest_port] || 0) + 1;
        return acc;
    }, {});

    const layout = {
        title: {
            font: {
                family: 'Arial, sans-serif',
                size: 24,
                color: '#ffffff'
            }
        },
        showlegend: true,
        legend: {
            x: 1,
            y: 1,
            bgcolor: 'rgba(255,255,255,0.5)',
            bordercolor: '#ffffff',
            font: {
                family: 'Arial, sans-serif',
                size: 12,
                color: '#ffffff'
            }
        },
        autosize: true,
        xaxis: {
            title: {
                font: {
                    family: 'Arial, sans-serif',
                    size: 14,
                    color: '#ffffff'
                }
            },
            showgrid: true,
            gridcolor: '#444444',
            zeroline: true,
            zerolinecolor: '#ffffff',
            showline: true,
            linecolor: '#ffffff',
            tickmode: 'auto',
            ticks: 'outside'
        },
        yaxis: {
            title: {
                font: {
                    family: 'Arial, sans-serif',
                    size: 14,
                    color: '#ffffff'
                }
            },
            showgrid: true,
            gridcolor: '#444444',
            zeroline: true,
            zerolinecolor: '#ffffff',
            showline: true,
            linecolor: '#ffffff',
            tickmode: 'auto',
            ticks: 'outside'
        },
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        paper_bgcolor: '#1a1a1a',
        plot_bgcolor: '#1a1a1a',
        font: {
            family: 'Arial, sans-serif',
            size: 12,
            color: '#ffffff'
        },
        hovermode: 'closest',
        hoverlabel: {
            bgcolor: '#333333',
            bordercolor: '#ffffff',
            font: {
                family: 'Arial, sans-serif',
                size: 12,
                color: '#ffffff'
            }
        }
    };

    return (
        <div className='plots'>
            <h1 id="dashboard">Network Alerts Dashboard</h1>
            {activeSection === 'dashboard' && (
                <div id="dashboard"> <Plot
                                    data={[
                                        {
                                            x: Object.keys(alertsByTime),
                                            y: Object.values(alertsByTime),
                                            type: 'scatter',
                                            mode: 'lines+markers',
                                            marker: { color: 'red' },
                                        },
                                    ]}
                                    layout={{
                                        ...layout,
                                        title: 'Time Series of Alerts',
                                        xaxis: {
                                            title: {
                                                text: 'Time',
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Number of Alerts',
                                            }
                                        },
                                    }}
                                />
                                <Plot
                                    data={[
                                        {
                                            x: Object.keys(alertsByCategory),
                                            y: Object.values(alertsByCategory),
                                            type: 'bar',
                                            marker: { color: 'blue' },
                                        },
                                    ]}
                                    layout={{
                                        title: 'Alerts by Category',
                                        ...layout,
                                        xaxis: {
                                            title: {
                                                text: 'Categories',
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Number of Alerts',
                                            }
                                        },
                                    }}
                                />
                                <Plot
                                    data={[
                                        {
                                            x: Object.keys(alertsBySrcIp),
                                            y: Object.values(alertsBySrcIp),
                                            type: 'bar',
                                            marker: { color: 'green' },
                                        },
                                    ]}
                                    layout={{
                                        ...layout,
                                        title: 'Top Source IPs',
                                        xaxis: {
                                            title: {
                                                text: 'IP addresses',
                                                font : {
                                                    color: 'red'
                                                }
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Number of Alerts',
                                            }
                                        },
                                        margin: {
                                            l: 50,
                                            r: 50,
                                            b: 150,
                                            t: 50,
                                            pad: 4
                                        },
                                    }}
                                />
                                
                                <Plot
                                    data={[
                                        {
                                            x: Object.keys(alertsByDestPort),
                                            y: Object.values(alertsByDestPort),
                                            type: 'bar',
                                            marker: { color: 'orange' },
                                        },
                                    ]}
                                    layout={{
                                        title: 'Top Destination Ports',
                                        ...layout,
                                        xaxis: {
                                            title: {
                                                text: 'Ports',
                                            }
                                        },
                                        yaxis: {
                                            title: {
                                                text: 'Number of Alerts',
                                            }
                                        },
                                    }}
                                /></div>
            )}
            {activeSection === 'time-series' && (
                <div id="time-series">
                    <Plot
                        data={[
                            {
                                x: Object.keys(alertsByTime),
                                y: Object.values(alertsByTime),
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={{
                            ...layout,
                            title: 'Time Series of Alerts',
                            xaxis: {
                                title: {
                                    text: 'Time',
                                }
                            },
                            yaxis: {
                                title: {
                                    text: 'Number of Alerts',
                                }
                            },
                        }}
                    />
                </div>
            )}

            {activeSection === 'alerts-category' && (
                <div id="alerts-category">
                    <Plot
                        data={[
                            {
                                x: Object.keys(alertsByCategory),
                                y: Object.values(alertsByCategory),
                                type: 'bar',
                                marker: { color: 'blue' },
                            },
                        ]}
                        layout={{
                            title: 'Alerts by Category',
                            ...layout,
                            xaxis: {
                                title: {
                                    text: 'Categories',
                                }
                            },
                            yaxis: {
                                title: {
                                    text: 'Number of Alerts',
                                }
                            },
                        }}
                    />
                </div>
            )}

            {activeSection === 'source-ips' && (
                <div id="source-ips">
                    <Plot
                        data={[
                            {
                                x: Object.keys(alertsBySrcIp),
                                y: Object.values(alertsBySrcIp),
                                type: 'bar',
                                marker: { color: 'green' },
                            },
                        ]}
                        layout={{
                            ...layout,
                            title: 'Top Source IPs',
                            xaxis: {
                                title: {
                                    text: 'IP addresses',
                                }
                            },
                            yaxis: {
                                title: {
                                    text: 'Number of Alerts',
                                }
                            },
                            margin: {
                                l: 50,
                                r: 50,
                                b: 150,
                                t: 50,
                                pad: 4
                            },
                        }}
                    />
                </div>
            )}

            {activeSection === 'destination-ports' && (
                <div id="destination-ports">
                    <Plot
                        data={[
                            {
                                x: Object.keys(alertsByDestPort),
                                y: Object.values(alertsByDestPort),
                                type: 'bar',
                                marker: { color: 'orange' },
                            },
                        ]}
                        layout={{
                            title: 'Top Destination Ports',
                            ...layout,
                            xaxis: {
                                title: {
                                    text: 'Ports',
                                }
                            },
                            yaxis: {
                                title: {
                                    text: 'Number of Alerts',
                                }
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
