import React from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, doordash, trash, tv, users, yt, ecommerce, house, utilities, travel, car, shopping, beauty, bank, insurance, pen } from '../../utils/Icons';
import Button from '../Button/Button';

const IncomeItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    updateItem,
    deleteItem,
    indicatorColor,
    type
}) {

    const incomeCategoryIcon = () =>{
        switch(category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return bank;
            case 'media':
                return yt;
            case 'ecommerce':
                return ecommerce;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCategoryIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'entertainment':
                return tv;
            case 'food delivery':
                return doordash;
            case 'clothing':
                return clothing;
            case 'travel':
                return travel;
            case 'transportation':
                return car;
            case 'shopping':
                return shopping;
            case 'house':
                return house;
            case 'utilities':
                return utilities;
            case 'tax':
                return circle;
            case 'credit card':
                return card;
            case 'beauty':
                return beauty;
            case 'insurance':
                return insurance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCategoryIcon() : incomeCategoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={pen}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => updateItem({ id, title, amount, date, category, description })}
                        />
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

export default IncomeItem