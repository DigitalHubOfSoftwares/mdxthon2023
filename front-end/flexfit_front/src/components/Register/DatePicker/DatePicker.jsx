import Datepicker from "tailwind-datepicker-react"
import { useState } from "react"

const options = {
	title: "Date Of Birth",
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "bg-white",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "",
		input: "",
		inputIcon: "",
		selected: "",
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
      </svg>,
		next: () => <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>,
	},
	datepickerClassNames: "top-12",
	defaultDate: new Date("2022-01-01"),
	language: "en",
}

const DatePicker = (props) => {
    const updateDate = props.updateDate;
	const [show, setShow] = useState(false)
	const handleChange = (selectedDate) => {
        updateDate(selectedDate);
	}
	const handleClose = (state) => {
		setShow(state)
	}

	return (
		<div>
			<Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
		</div>
	)
}

export default DatePicker;