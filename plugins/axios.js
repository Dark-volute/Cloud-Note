export default function ({ $axios, redirect }) {
    $axios.onResponse(res => {
        if(res.data.code === -1) {
            console.log(res.data.message)
        }
        return  res.data
    })

  }