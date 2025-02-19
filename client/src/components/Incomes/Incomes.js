import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { InnerLayout } from '../../styles/Layout'
import IncomeForm from '../Forms/IncomeForm'
import ListItem from '../ListItem/ListItem'

const IncomeStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

function Incomes() {

  const {addIncome, getIncomes, incomes, deleteIncome, updateIncome, totalIncome} = useGlobalContext()
  const [editingIncome, setEditingIncome] = useState(null)
  
  useEffect(() =>{
    getIncomes()
  }, [])

  const handleUpdate = (id, updatedIncome) => {
    updateIncome(id, updatedIncome);
    setEditingIncome(null);
  } 

  return (
    <IncomeStyled>
      <InnerLayout>
          <h1>Incomes</h1>
          <h2 className="total-income">Total Income: <span>${totalIncome()}</span></h2>
          <div className="income-content">
              <div className="form-container">
                  <IncomeForm initialData={editingIncome} onSubmit={handleUpdate}/>
              </div>
              <div className="incomes">
                  {incomes.map((income) => {
                      const {_id, title, amount, date, category, description, type} = income;
                      return <ListItem
                          key={_id}
                          id={_id} 
                          title={title} 
                          description={description} 
                          amount={amount} 
                          date={date} 
                          type={type}
                          category={category} 
                          indicatorColor="var(--color-green)"
                          deleteItem={deleteIncome}
                          updateItem={setEditingIncome}
                      />
                  })}
              </div>
          </div>
      </InnerLayout>
    </IncomeStyled>
  )
}

export default Incomes