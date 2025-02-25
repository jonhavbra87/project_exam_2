import styled from "styled-components";

export const StyledDatePickerWrapper = styled.div`
  .react-datepicker {
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
  }

  .react-datepicker__header {
    background: #220840;
    border-bottom: 1px solid #1F1F1F;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name  {
    color: white;
  }

  .react-datepicker__day,
  .react-datepicker__day:hover,
  .react-datepicker__day--today.
  .react-datepicker__day--selected,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    color: #1F1F1F !important;
    border-radius: 5px !important;
  }

  .react-datepicker__day--today {
    background-color: #7E30E1 !important;
    color: white !important;
    border-radius: 5px; 
    font-weight: bold;
  }

  .react-datepicker__day--today:hover {
  background-color: #674C8B !important;
  color: #1F1F1F !important;
  transition: all 0.3s;
  }

  .react-datepicker__day:hover {
    background-color: #C2B5F7 !important;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    font-weight: bold;
    color: #1F1F1F !important;
    transition: all 0.3s;
  }
  
  .react-datepicker__day--selected {
    background-color: #340C52;
}

  .react-datepicker__day--range-start {
    background-color: #7C2FE0 !important;
  }

  .react-datepicker__day--range-end {
    background-color: #9d4edd;
  }

  .react-datepicker__day--in-range {
    background-color: #d8b4f8 !important;
  }

  .react-datepicker__day--in-selecting-range {
    background-color: #EEB5F7 !important;
  }
`;
