import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import axios from "axios";
import Layout from "@/Layouts/Layout";

import { Inertia} from "@inertiajs/inertia";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import '@fontsource/roboto/300.css';

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


export default function ManagerSchedulerSidePanel( {section, eventID, userProp} ){

    console.log(section);


    //Transfer-list helpers
    function not(a, b) {
        return a.filter((value) => b.indexOf(value) === -1);
    }

    function intersection(a, b) {
        return a.filter((value) => b.indexOf(value) !== -1);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    const { data, setData, post, processing, errors } = useForm({
        section_name: "",
        schedule_list: '',
        unScheduledLeft: [],
        scheduledRight: [],
        checked: [],
        eventIDVar: '',
        sectionVar: ''
    });

    console.log(data);
    const leftChecked = intersection(data.checked, data.unScheduledLeft);
    const rightChecked = intersection(data.checked, data.scheduledRight);

    const [scheduleList, setScheduleList] = useState([]);
    const names = [];

    // todo don't know why axios won't see routes with parameters but their in the request any way
    // todo:~project path must come from env variables
    const requestString = 'http://127.0.0.1:8000/getEventScheduledSectionList';

    // console.log(requestString);

    useEffect(() => {

        axios.get(requestString, {
            params: {
                eventID:eventID,
                sectionTitle:section
            }
        })
            .then(function (response) {
                // handle success
                // console.log(response);
                // console.log(response.data.scheduledEmployees.map);

                const scheduledEmployeesName = [];
                console.log("Scheduled Employees");
                response.data.scheduledEmployees.map(employee => {
                    console.log('Name: ' + employee.employeeName + ' ID: ' + employee.employeeID);
                    scheduledEmployeesName.push(employee.employeeName);
                } );

                const unScheduledEmployeesName = [];
                console.log("Un Scheduled Employees");
                response.data.notScheduledEmployees.map(employee => {
                    console.log('Name: ' + employee.name + ' ID: ' + employee.id);
                    unScheduledEmployeesName.push(employee.name);
                } );

                console.log('HEREHEREHEREHEREHERE');
                setData({
                    unScheduledLeft:unScheduledEmployeesName ,
                    scheduledRight:scheduledEmployeesName,
                    checked:[],
                    section_name:"",
                    schedule_list:'',
                    eventIDVar:eventID,
                    sectionVar: section
                });

            })
            .catch(function (error) {
                // handle error
                console.log('error here');
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

        return () => {
            // console.log(Inertia.get('getEventSectionSchedule', {} , {preserveState: true}));
          // console.log(route('getEventSectionSchedule'));
        };
    }, [section]);

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

    const handleCheckedRight = () => {
        setData({
            scheduledRight: (data.scheduledRight.concat(leftChecked)),
            unScheduledLeft: not(data.unScheduledLeft, leftChecked),
            checked: not(data.checked, leftChecked),
            section_name:"",
            schedule_list:'',
            eventIDVar:eventID,
            sectionVar: section

        });
        /*setData({
            right: [],
            left: not(data.left, leftChecked),
            checked: not(data.checked, leftChecked)
        });*/
    };

    const handleCheckedLeft = () => {
        setData({
            unScheduledLeft: (data.unScheduledLeft.concat(rightChecked)),
            scheduledRight: not(data.scheduledRight, rightChecked),
            checked: not(data.checked, rightChecked),
            section_name:"",
            schedule_list:'',
            eventIDVar:eventID,
            sectionVar: section
        });
    };

    const customList = (items) => (
        <Paper sx={{ width: 145, height: 180, overflow: 'auto' }}>
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



    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("managerUpdateEventSection"));
        //todo:: make a second request that submits the new section schedule and throws a popup or a maybe a confirm message and unselect the section selection


    };

    // console.log(scheduleList);

    return (

        /*<h2>
            {}
            {scheduleList}
            {section}
            {eventID}
        </h2>*/

         /*<AuthenticatedLayout
        auth={userProp}
       errors={ [] }
       header={
           <h2 className="font-semibold text-xl text-gray-800 leading-tight">
           </h2>
       }
   >*/
       // <Head title='Manager Side Panel'/>

        <Layout>
            <div className="text-center" >{section}</div>

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
                            <Grid item>{customList(data.unScheduledLeft)}</Grid>
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
                            <Grid item>{customList(data.scheduledRight)}</Grid>
                        </Grid>






                        <div className="mt-4"></div>
                    </div>
                </div>
                <PrimaryButton type="submit" className="ml-4" processing={processing}>
                    Apply Changes
                </PrimaryButton>
            </form>

        </Layout>






    );
}
