import React, { useState, useEffect } from "react";
import { Inertia} from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import NumberInput from "@/Components/NumberInput";
import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { Head, Link, useForm, Controller} from "@inertiajs/inertia-react";

import "react-datepicker/dist/react-datepicker.css";

export default function CreateEvents(props) {
    const { data, setData, control, post, processing, errors } = useForm({
        name: "",
        //manager: "",
        start_date: "",
        daily_start_time: "",
        daily_end_time: "",
        end_date: "",
        number_of_shifts: 2,
        employees_needed_per_shift: 4
    });

    console.log(data);

    // const [startDate, setStartDate] = useState(new Date());
    //const [endDate, setEndDate] = useState(new Date());

    //console.log(setStartDate);



    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    /*const setStartDate = (event) => {
        console.log(event.taret);

        // setData(
        //     event.target.startDate, event.target.
        // );

    };*/


    // useEffect(() => {
    //    setStartDate(new Date());
    //    setEndDate(new Date());
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(data);

        post(route("createEvent")); // todo: Don't know how this works
        /*Inertia.post('createEvent', {
            name: data.name,
            start_date: data.startDate,
            end_date: data.endDate
        } );*/

    };

    return (
        //todo:: add an option and subsequent ~popup for customizing times for an event
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create Event
                </h2>
            }
        >
            <Head title="Create Event" />

            <form onSubmit={handleSubmit}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <InputLabel forInput="name" value="Event Name" />

                            <TextInput
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                // autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel forInput="managers" value="Managers" />

                            <div className="block mt-4 ml-5">
                                {/*<label className="flex items-center">
                                    <Checkbox
                                        name="managers"
                                        value={data.managers}
                                        handleChange={onHandleChange}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Manager
                                    </span>
                                </label>*/}

                                {/*<label className="flex items-center">
                                    <Checkbox
                                        name="managers"
                                        value={data.managers}
                                        handleChange={onHandleChange}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Manager 2
                                    </span>
                                </label>

                                <label className="flex items-center">
                                    <Checkbox
                                        name="managers"
                                        value={data.managers}
                                        handleChange={onHandleChange}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Manager 3
                                    </span>
                                </label>*/}
                            </div>

                            <InputError
                                message={errors.managers}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="flex items-center">
                                {" "}
                                Event Start Date{" "}
                            </label>

                            <DatePicker
                                selected={data.start_date}
                                onChange={(date) => setData('start_date',date )}
                                dateFormat="MMMM d, yyyy"
                            />

                        </div>


                        <div className="mt-4">
                            <label className="flex items-center">
                                {" "}
                                Start Time{" "}
                            </label>

                            <DatePicker
                                selected={data.daily_start_time}
                                onChange={(date) => setData('daily_start_time',date)}
                                // onChange={(date) => console.log(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                // minTime={setHours(setMinutes(new Date(), 0), 6)}
                                // maxTime={setHours(setMinutes(new Date(), 0), 21)}
                                timeIntervals={60}
                                timeCaption="Start Time"
                                dateFormat="h:mm aa"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="flex items-center">
                                {" "}
                                Event End Date{" "}
                            </label>

                            <DatePicker
                                selected={data.end_date}
                                onChange={(date) => setData('end_date',date )}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="flex items-center">
                                {" "}
                                End Time{" "}
                            </label>

                            <DatePicker
                                selected={data.daily_end_time}
                                onChange={(date) => setData('daily_end_time',date)}
                                showTimeSelect
                                showTimeSelectOnly
                                minTime={setHours(setMinutes(new Date(), 0), 6)}
                                maxTime={setHours(setMinutes(new Date(), 0), 22)}
                                timeIntervals={60}
                                timeCaption="Start Time"
                                dateFormat="h:mm aa"
                            />
                        </div>

                        <div>
                            <InputLabel forInput="name" value="Number of Shifts" />

                            <NumberInput
                                name="Number of Shifts"
                                value={data.number_of_shifts}
                                className="mt-1 block w-full"
                                // autoComplete="username"
                                handleChange={onHandleChange}
                            />
                        </div>

                        <div>
                            <InputLabel forInput="name" value="Number of Shifts" />

                            <NumberInput
                                name="Employees Needed per Shift"
                                value={data.employees_needed_per_shift}
                                className="mt-1 block w-full"
                                // autoComplete="username"
                                handleChange={onHandleChange}
                            />
                        </div>



                        <div className="mt-4"></div>
                    </div>
                </div>

                <PrimaryButton className="ml-4" processing={processing}>
                    Create Event
                </PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );
}
