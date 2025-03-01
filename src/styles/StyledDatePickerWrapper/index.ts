/**
 * @fileoverview Styled wrapper for React DatePicker component
 * @module components/DatePicker/styles
 */
import styled from 'styled-components';

/**
 * Styled wrapper component for customizing the appearance of react-datepicker
 *
 * This component applies custom styling to the react-datepicker library components,
 * providing a consistent theme with the application's color scheme. It includes
 * custom styling for the calendar header, day elements, selected ranges, and
 * various interaction states.
 *
 * @component
 * @example
 * import DatePicker from "react-datepicker";
 * import "react-datepicker/dist/react-datepicker.css";
 * import { StyledDatePickerWrapper } from "./DatePickerStyles";
 *
 * const MyDatePicker = () => {
 *   const [startDate, setStartDate] = useState(new Date());
 *
 *   return (
 *     <StyledDatePickerWrapper>
 *       <DatePicker
 *         selected={startDate}
 *         onChange={(date) => setStartDate(date)}
 *         dateFormat="MMMM d, yyyy"
 *       />
 *     </StyledDatePickerWrapper>
 *   );
 * };
 */

export const StyledDatePickerWrapper = styled.div`
  .react-datepicker {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
  }

  .react-datepicker__header {
    background: #220840;
    border-bottom: 1px solid #1f1f1f;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: white;
  }

  .react-datepicker__day,
  .react-datepicker__day:hover,
  .react-datepicker__day--today. .react-datepicker__day--selected,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    color: #1f1f1f !important;
    border-radius: 5px !important;
  }

  .react-datepicker__day--today {
    background-color: #7e30e1 !important;
    color: white !important;
    border-radius: 5px;
    font-weight: bold;
  }

  .react-datepicker__day--today:hover {
    background-color: #674c8b !important;
    color: #1f1f1f !important;
    transition: all 0.3s;
  }

  .react-datepicker__day:hover {
    background-color: #c2b5f7 !important;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    font-weight: bold;
    color: #1f1f1f !important;
    transition: all 0.3s;
  }

  .react-datepicker__day--selected {
    background-color: #340c52;
  }

  .react-datepicker__day--range-start {
    background-color: #7c2fe0 !important;
  }

  .react-datepicker__day--range-end {
    background-color: #9d4edd;
  }

  .react-datepicker__day--in-range {
    background-color: #d8b4f8 !important;
  }

  .react-datepicker__day--in-selecting-range {
    background-color: #eeb5f7 !important;
  }
`;
