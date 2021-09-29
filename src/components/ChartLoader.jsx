import React from 'react'
import { useContext, useRef } from 'react/cjs/react.development'
import AppContext from '../helpers/AppCtx'

function ChartLoader() {
    const appCtx = useContext(AppContext)
    const uploadRef = useRef()

    const chartUpload = () => {
        if(uploadRef.current.files.length <= 0){
            return
        }

        if(uploadRef.current.files[0].type !== 'application/json'){
            alert('Invalid File Type.')
            uploadRef.current.value = ''
            return
        }

        console.log(uploadRef.current.files)
        let fr = new FileReader()
        fr.onload = (event) => {
            console.log('in onload', event.target.result)
            const res = JSON.parse(event.target.result)
            appCtx.uploadChartToList(res)
            uploadRef.current.value = ''
        }
        fr.readAsText(uploadRef.current.files[0])
    }

    return (
        <div className="chart-uploader">
            <input ref={uploadRef} type="file"/>
            <button onClick={chartUpload}>Upload Chart</button>
        </div>
    )
}

export default ChartLoader
