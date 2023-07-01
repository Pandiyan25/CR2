import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

const OverallRatings = ({ text, value }) => {
    return (

            <div className="col mainPieCircle">
                <div style={{ height: '120px', width: '115px' }}>
                    <PieChart

                        animate
                        animationDuration={500}
                        animationEasing="ease-out"
                        // labelStyle={{
                        //     fontSize: "5px",
                        //     fill: "#000"
                        // }}
                        labelPosition={45}
                        lineWidth={40}
                        data={[
                            { title: `${10 - value}`, value: 10 - value, color: '#94B3E8' },
                            { title: value, value: value, color: '#6345ED' },
                            // { title: 'Three', value: 20, color: '#6A2135' },
                        ]}
                    // radius={30}

                    />

                </div>
                <div className='marginTopCircleTxt' >{value}</div>


                <div>

                    <h3 className="card-title mb-0" style={{ fontSize: '16px', marginTop: '10px' }}>{text}</h3>
                </div>
                {/* <div style={{ marginTop: '-85px',  fontSize: '20px', fontWeight: 'bold', position: 'absolute' }}>21</div> */}
            </div>
        // </div>
    )
}

export default OverallRatings