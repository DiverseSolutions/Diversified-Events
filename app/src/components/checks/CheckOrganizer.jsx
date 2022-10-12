import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';

import { getOrganizerNftContract } from '../../../contracts/OrganizerNFTContractHelper.jsx';
import { userIsOrganizer } from '../../slices/appSlice.jsx';

export default function CheckOrganizer({ children }){
  const app = useSelector((state) => state.app);
  const metamask = useSelector((state) => state.metamask);
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfUserIsOrganizer()
  },[])

  async function checkIfUserIsOrganizer(){
    const { organizerNftReadContract } = await getOrganizerNftContract()
    let balance = await organizerNftReadContract.balanceOf(metamask.selectedAccount)
    console.log(balance.toNumber())

    if(balance.toNumber() > 0){
      dispatch(userIsOrganizer())
    }
  }

  return (
    <>{ children }</>
  )
}
