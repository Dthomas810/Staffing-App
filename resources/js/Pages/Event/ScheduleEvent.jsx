import React, { useState, useEffect } from "react";
import { Inertia} from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Dropdown from "@/Components/Dropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import DatePicker from "react-datepicker";
import { Head, useForm, Controller } from "@inertiajs/inertia-react";


// import {ReOrderableItem, ReOrderableList, ReOrderableListGroup} from "react-reorderable-list";
// import 'react-reorderable-list/dist/index.css';
// import { ListGroup } from 'react-bootstrap';

import '@fontsource/roboto/300.css';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// import Button from '@mui/material/Button';



import ReactDropdown from "react-dropdown";
import 'react-dropdown/style.css';

// import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";




// function not(a, b) {
//     return a.filter((value) => b.indexOf(value) === -1);
// }
//
// function intersection(a, b) {
//     console.log(a);
//     console.log(b);
//     return a.filter((value) => b.indexOf(value) !== -1);
// }

//todo:the form can be a modal
//todo: needs a default value; breaks if page is opened and only submit button is hit
export default function ScheduleEvent(props) {
console.log(props);

    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
        console.log(a);
        console.log(b);
        return a.filter((value) => b.indexOf(value) !== -1);
    }


    const { data, setData, control, post, processing, errors } = useForm({
        section_name: "",
        event_id: props.eventID,
        schedule_list: '',
        left: ['South Upper',
            'North Upper',
            'NE Lower',
            'N Lower',
            'W Lower',
            'S Lower'],
        right: [],
        checked: [],
    });


    // console.log(data.checked);
    const leftChecked = intersection(data.checked, data.left);
    const rightChecked = intersection(data.checked, data.right);

    // console.log(data);

//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const handleToggle = (value) => () => {
        const currentIndex = data.checked.indexOf(value);
        const newChecked = [...data.checked];
        // console.log(newChecked);

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setData('checked', newChecked);

    };

    const handleAllRight = () => {
        // console.log(data.right.concat(data.left))
        /*setData({
            section_name: 'pls',
            // right: (data.right.concat(data.left)),
            // left: []
        });*/
    };

    const handleCheckedRight = () => {
        setData({
            right: (data.right.concat(leftChecked)),
            left: not(data.left, leftChecked),
            checked: not(data.checked, leftChecked),
            event_id: props.eventID
        });
        /*setData({
            right: [],
            left: not(data.left, leftChecked),
            checked: not(data.checked, leftChecked)
        });*/
    };

    const handleCheckedLeft = () => {
        setData({
            left: (data.left.concat(rightChecked)),
            right: not(data.right, rightChecked),
            checked: not(data.checked, rightChecked),
            event_id: props.eventID
        });
    };

    const handleAllLeft = () => {
        setData({
            left: (data.left.concat(data.right)),
            right: []
        });
    };


    const customList = (items) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-item-${value}-label`;

                    return (
                        <ListItem
                            key={value}
                            role="listitem"
                            button
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={data.checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={` ${value}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const options = [
    // { value:'', label: ''},
    { value:'South Upper', label: 'South Upper'},
    { value:'North Upper', label: 'North Upper'},
    { value:'NE Lower', label: 'NE Lower'},
    { value:'N Lower', label: 'N Lower'},
    { value:'W Lower', label: 'W Lower'},
    { value:'S Lower', label: 'S Lower'}
];

// console.log(options);

// console.log(options.indexOf(props.section_title));
// const defaultOption = options[options.indexOf(props.section_title)];
// const defaultOption =  options.findIndex(function(option){
//     return option.value ==  props.section_title;
// } );
const defaultOption = 'South Upper';   //todo: HERE set this to the incoming title
// console.log(defaultOption);

    const onHandleChange = (event) => {
        // console.log(event.)
        setData('section_name' , event.value);
        // setData('schedule_list', right);
        // console.log(data);
        // console.log(right);

        // setData(section_name, event.value);
        /*setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );*/
    };
    // console.log(data);



    const handleSubmit = (e) => {
        e.preventDefault();

        // setData('schedule_list', 12);// todo: why does this not work when in the submit function but does when done in others?
        /*right.foreach(rightElement => {
            setData('schedule_list', data.schedule_list => [...data.schedule_list,])
        })*/

        // setData('schedule_list', right);
        // setData('schedule_list', 'test');
        // console.log(right);
        // console.log(left);
        // console.log(data);

        // router.post('employeeScheduleEvent', data);

        post(route("employeeScheduleEvent")); // todo: Don't know how this works rn, I think route comes from inertia
        /*Inertia.post('createEvent', {
            name: data.name,
            start_date: data.startDate,
            end_date: data.endDate
        } );*/

    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {props.eventTitle}
                </h2>
            }
        >
            <Head title='Schedule Event'/>

            <form onSubmit={handleSubmit}>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        {/*{data.section_name}*/}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">


                            {/*<Select
                                // defaultValue={data.section_name}
                                // menuPortalTarget={document.body}
                            options={options}
                            // onChange={onHandleChange}
                            // value={defaultOption}
                            />*/}

                            {/*<ReactDropdown
                            options={options}
                            onChange={onHandleChange}
                            value={defaultOption}
                            placeholder={'Pls work'}
                            />*/}


                            {/*<TextInput
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
                            />*/}

                        </div>
                        <InputLabel forInput="Scheduled Section"/>

                       {/* <ReactDropdown
                            options={options}
                            onChange={onHandleChange}
                            value={defaultOption}
                            placeholder={'Pls work'}
                            />*/}



                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item>{customList(data.left)}</Grid>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                    {/*<Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllRight}
                                        disabled={data.left.length === 0}
                                        aria-label="move all right"
                                    >
                                        ≫
                                    </Button>*/}
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                    {/*<Button
                                        sx={{ my: 0.5 }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllLeft}
                                        disabled={data.right.length === 0}
                                        aria-label="move all left"
                                    >
                                        ≪
                                    </Button>*/}
                                </Grid>
                            </Grid>
                            <Grid item>{customList(data.right)}</Grid>
                        </Grid>






                        <div className="mt-4"></div>
                    </div>
                </div>
                <PrimaryButton className="ml-4" processing={processing}>
                    Schedule Event
                </PrimaryButton>
            </form>
        </AuthenticatedLayout>
    );


}
