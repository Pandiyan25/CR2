import React from 'react'
import Rating from 'react-rating'

const RatingRemarks = ({ text, value, remarks ,show }) => {
    return (
        <div>
            <div className='capsTop'>
                {text}
            </div>
            {show != false ?
            
            <div>

                <Rating
                    stop={10}
                    style={{ color: 'red', marginBottom: '15px' }}
                    emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                        n == 10 ?

                            <span className="icon-text-on10-rating">{n}</span>
                            :

                            <span className="icon-text-on-rating">{n}</span>
                    )}
                    fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
                        n == 10 ?

                            <span className="icon-text10-rating">{n}</span>
                            :

                            <span className="icon-text-rating">{n}</span>


                    )}
                    // onChange={(rate) => changeMarketValueFunc(rate)}
                    // readonly={true}
                    initialRating={value}
                    readonly='true'
                />
            </div>
            :
            <></>
            }
            <div className='capsBot'>
                {remarks}
            </div>
        </div>
    )
}

export default RatingRemarks