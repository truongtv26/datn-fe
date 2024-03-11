import React from 'react'

function FormatCurrency(number){
     return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
     }).format(Number(number))
}

export default FormatCurrency