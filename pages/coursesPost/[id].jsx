import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
const userPostDetails = ({data}) => {
  return (
    <div>userPostDetails</div>
  )
}


export default userPostDetails;

export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(id);
  return {
    props: {
      data: id
    }}
  }