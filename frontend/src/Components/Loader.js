import React from 'react'

export default function Loader() {
    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status" style={{ height: '80px', width: '80px' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}
