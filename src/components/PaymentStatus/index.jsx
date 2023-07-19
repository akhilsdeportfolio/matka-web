import React from 'react'
import { useParams } from 'react-router-dom'
import { usePhonePeCheckStautsQuery } from '../../features/api/apiSlice';

export default function PaymentsStatus() {

const {id}=useParams();
const {data,loading}=usePhonePeCheckStautsQuery(id)


return (
    <div>Statuts:  {JSON.stringify(data)}{loading}</div>
  )
}
