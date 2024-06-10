import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import DataTable from 'react-data-table-component';
import PrimaryButton from "@/Components/PrimaryButton";


export default function Dashboard(props) {

    console.log(props);

    let data = props.data;
    let columns = [];

    if (props.auth.user.role == "Employee") {

        columns = [
            {
                name: "Schedule Event",
                button: true,
                cell: row => (
                    // <Link to="/scheduler" params={{ eventID: row.id }}>Scheduler</Link>
                    // <Link to={`/scheduler/eventID=${row.id}`} params={{ eventID: row.id }}>Scheduler</Link>
                    <a  href={`/employeeScheduler/${row.id}`} target="_self" rel="noopener noreferrer">
                        Scheduler
                    </a>
                ),
                conditionalCellStyles: [
                    {
                        when: row => row.scheduled ==  true,
                        style: {
                            backgroundColor: 'rgba(63, 195, 128, 0.9)',
                            color: 'white',
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }
                    },
                    {
                        when: row => row.scheduled == false,
                        style: {
                            backgroundColor: 'rgba(248, 148, 6, 0.9)',
                            color: 'white',
                            '&:hover': {
                                cursor: 'pointer'
                            }
                        }
                    }
                ]
            },
            {
                name: 'Event Name',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'Start Date',
                selector: row => row.start_date,
                //sortable: true,
            },
            {
                name: 'End Date',
                selector: row => row.end_date,
                //sortable: true,
            }
        ];

        return (
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Employee Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                Events

                                <a href={route("Event/ScheduleEvent")} >
                                    <PrimaryButton>Availability</PrimaryButton>
                                </a>

                                <DataTable
                                    noDataComponent="Message?"
                                    columns={columns}
                                    data={data}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );

    }else if(props.auth.user.role == "Manager"){

        columns = [
            {
                name: "Schedule",
                button: true,
                cell: row => (
                    // <Link to="/scheduler" params={{ eventID: row.id }}>Scheduler</Link>
                    // <Link to={`/scheduler/eventID=${row.id}`} params={{ eventID: row.id }}>Scheduler</Link>
                    <a href={`/scheduler/${row.id}`} target="_self" rel="noopener noreferrer">Scheduler</a>
                )
            },
            {
                name: 'Event Name',
                selector: row => row.name,
                sortable: true,
            },
            {
                name: 'Start Date',
                selector: row => row.start_date,
                //sortable: true,
            },
            {
                name: 'End Date',
                selector: row => row.end_date,
                //sortable: true,
            }
        ];


        return (
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Manager Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            {/* <button
                                onClick={StartEvent}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
Create Event
</button> */}
                            <Link
                                component="button"
                                href={route("createEvent")}
                                method="get"
                            >
                                Create Event
                            </Link>
                        </div>
                        <div>
                            <DataTable
                                noDataComponent="Message?"
                                columns={columns}
                                data={data}
                            />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

}
