import React, {useEffect, useState, useForm} from "react";
import { Inertia} from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ManagerSchedulerSidePanel from "@/Pages/Scheduler/ManagerSchedulerSidePanel"
import {Head} from "@inertiajs/inertia-react";
import {template} from "lodash";
import ImageMapper from 'react-img-mapper'
import {ImageMapperDefaultProps} from "react-img-mapper/dist/constants";
import exampleJSON from "@/Components/Maps/example.json"
import whiteSoxMapJSON from "@/Components/Maps/whiteSoxMap.jsx"


export default function ManagerScheduler(props) {
    console.log(props);

    //console.log(Inertia.get('getEventSectionSchedule', {} , {preserveState: true}));
    const [incomingRequest, setincomingRequest] = useState('incoming request');


    useEffect(() => {
        /*console.log(Inertia.get('getEventSectionSchedule', {
                    eventID: props.eventID,
                    sectionTitle: props.sectionTitle
                } , {preserveState: true}));*/
        return () => {
            // Inertia.get('getEventSectionSchedule', {
            //     eventID: props.eventID,
            //     sectionTitle: props.sectionTitle
            // } , {preserveState: true});


            // route("getEventSectionSchedule");

            /*setincomingRequest(Inertia.get('/getEventSectionSchedule', {
                eventID: 1,
                sectionTitle: 'South Upper'
            } , {preserveState: false}));*/

            // console.log(incomingRequest);


            /*Inertia.get('getEventSectionSchedule', {
                eventID: 1,
                sectionTitle: 'South Upper'
            } , {preserveState: true});*/

            /*console.log(Inertia.get('getEventSectionSchedule', {
                eventID: 1,
                sectionTitle: 'South Upper'
            } , {preserveState: true}));*/
        };
    }, []);
    console.log(incomingRequest);

    /*var parser = new DOMParser();
    var mapHTML = parser.parseFromString("<img src=\"chicago-white-sox-seating-chart-with-rows-at-guaranteed-rate-field.jpg\" alt=\"\" usemap=\"#map\" />\n" +
        "<map name=\"map\">\n" +
        "    <area shape=\"poly\" coords=\"939, 175, 919, 225, 877, 294, 913, 306, 959, 325, 1003, 352, 1011, 355, 1045, 386, 1074, 365, 1100, 393, 1156, 451, 1226, 387, 1171, 333, 1165, 325, 1129, 291, 1079, 249, 1017, 210, 960, 183\" title=\"100-105\" />\n" +
        "    <area shape=\"poly\" coords=\"1242, 544, 1316, 488, 1343, 534, 1354, 567, 1355, 602, 1354, 611, 1339, 674, 1189, 628, 1203, 613, 1211, 603, 1226, 583, 1244, 569\" title=\"108-110\" />\n" +
        "    <area shape=\"poly\" coords=\"1183, 633, 1174, 650, 1170, 657, 1159, 673, 1144, 700, 1129, 726, 1115, 749, 1254, 843, 1271, 814, 1293, 775, 1323, 715, 1335, 679\" title=\"111-115\" />\n" +
        "    <area shape=\"poly\" coords=\"1012, 916, 1024, 890, 1030, 884, 1039, 864, 1043, 855, 1058, 834, 1063, 829, 1076, 813, 1078, 803, 1095, 782, 1095, 777, 1112, 755, 1251, 847, 1237, 870, 1234, 879, 1219, 901, 1214, 909, 1196, 934, 1190, 939, 1176, 962, 1173, 966, 1157, 987, 1153, 995, 1137, 1013\" title=\"116-121\" />\n" +
        "    <area shape=\"poly\" coords=\"935, 1053, 950, 1032, 956, 1027, 969, 1008, 975, 1001, 994, 982, 996, 977, 1010, 959, 1012, 955, 1028, 937, 1135, 1024, 1100, 1064, 1056, 1117, 1029, 1152\" title=\"122-126\" />\n" +
        "    <area shape=\"poly\" coords=\"820, 1116, 827, 1169, 829, 1177, 839, 1267, 886, 1255, 895, 1249, 924, 1236, 932, 1233, 956, 1217, 992, 1188, 1022, 1156, 928, 1061, 912, 1081, 893, 1066, 880, 1083, 877, 1086, 860, 1099, 854, 1101, 840, 1111\" title=\"127-131\" />\n" +
        "    <area shape=\"poly\" coords=\"714, 1068, 615, 1189, 644, 1211, 647, 1218, 676, 1234, 712, 1253, 765, 1270, 832, 1270, 822, 1177, 785, 1177, 776, 1176, 778, 1166, 784, 1116, 760, 1109, 751, 1101, 743, 1097, 729, 1087, 724, 1081\" title=\"132-136\" />\n" +
        "    <area shape=\"poly\" coords=\"581, 889, 594, 913, 577, 935, 594, 955, 597, 959, 610, 978, 631, 1003, 635, 1007, 650, 1026, 657, 1034, 673, 1051, 676, 1059, 694, 1080, 609, 1182, 584, 1154, 580, 1149, 555, 1122, 549, 1116, 532, 1094, 525, 1089, 512, 1071, 505, 1064, 494, 1049, 488, 1042, 476, 1021, 454, 994\" title=\"137-143\" />\n" +
        "    <area shape=\"poly\" coords=\"357, 848, 369, 870, 375, 879, 389, 901, 393, 906, 411, 929, 415, 939, 430, 959, 434, 964, 448, 989, 577, 884, 569, 863, 563, 855, 551, 837, 546, 829, 533, 810, 527, 805, 514, 783, 508, 775, 496, 754\" title=\"144-148\" />\n" +
        "    <area shape=\"poly\" coords=\"269, 680, 281, 705, 284, 713, 297, 740, 301, 749, 314, 769, 319, 783, 333, 806, 337, 814, 353, 840, 492, 750, 481, 731, 475, 723, 466, 707, 460, 700, 450, 682, 447, 676, 437, 658, 432, 651, 424, 634\" title=\"149-153\" />\n" +
        "    <area shape=\"poly\" coords=\"377, 392, 336, 437, 331, 442, 294, 481, 291, 488, 268, 528, 264, 535, 252, 606, 269, 675, 418, 629, 404, 615, 399, 607, 381, 585, 373, 575, 368, 549, 367, 538, 402, 507, 407, 500, 448, 457\" title=\"154-158\" />\n" +
        "    <area shape=\"poly\" coords=\"668, 175, 650, 183, 598, 207, 590, 208, 534, 244, 526, 249, 477, 293, 443, 325, 436, 332, 381, 388, 479, 475, 526, 421, 535, 415, 556, 392, 564, 384, 594, 354, 605, 350, 642, 327, 652, 325, 688, 309, 694, 304, 732, 297\" title=\"159-164\" />\n" +
        "    <area shape=\"poly\" coords=\"133, 357, 108, 399, 106, 406, 76, 489, 74, 497, 62, 589, 62, 596, 76, 683, 78, 695, 103, 773, 205, 721, 186, 673, 181, 653, 171, 603, 171, 582, 181, 535, 184, 517, 204, 474, 216, 455, 228, 434\" title=\"554-558\" />\n" +
        "    <area shape=\"poly\" coords=\"292, 1095, 368, 1040, 382, 1025, 358, 989, 346, 971, 315, 926, 305, 911, 278, 865, 268, 847, 243, 801, 233, 783, 211, 738, 105, 779, 138, 844, 141, 852, 172, 911, 178, 920, 215, 974, 221, 982, 254, 1036, 260, 1045\" title=\"544-552\" />\n" +
        "    <area shape=\"poly\" coords=\"612, 1284, 547, 1381, 486, 1335, 482, 1329, 432, 1280, 426, 1274, 386, 1229, 379, 1222, 338, 1166, 332, 1157, 295, 1102, 372, 1049, 397, 1042, 426, 1085, 442, 1101, 472, 1141, 484, 1154, 514, 1189, 527, 1206, 563, 1245, 580, 1259\" title=\"536-542\" />\n" +
        "    <area shape=\"poly\" coords=\"976, 1296, 1053, 1387, 983, 1427, 977, 1430, 893, 1459, 886, 1459, 806, 1468, 797, 1465, 720, 1462, 712, 1458, 628, 1430, 623, 1426, 552, 1386, 605, 1316, 630, 1297, 669, 1320, 726, 1340, 744, 1345, 795, 1351, 812, 1352, 861, 1344, 883, 1341, 920, 1325, 942, 1319\" title=\"529-535\" />\n" +
        "    <area shape=\"poly\" coords=\"1210, 1042, 1178, 1084, 1171, 1097, 1136, 1140, 1124, 1154, 1091, 1190, 1080, 1205, 1044, 1243, 1030, 1257, 993, 1285, 1060, 1383, 1120, 1335, 1125, 1330, 1176, 1282, 1180, 1274, 1222, 1229, 1228, 1222, 1267, 1165, 1273, 1160, 1310, 1105\" title=\"522-528\" />\n" +
        "    <area shape=\"poly\" coords=\"1393, 736, 1372, 784, 1365, 796, 1340, 845, 1329, 863, 1302, 909, 1292, 926, 1260, 971, 1251, 987, 1225, 1024, 1315, 1099, 1347, 1046, 1351, 1038, 1391, 982, 1396, 972, 1431, 918, 1465, 851, 1471, 844, 1500, 779\" title=\"512-520\" />\n" +
        "    <area shape=\"poly\" coords=\"1375, 433, 1392, 457, 1402, 471, 1423, 520, 1426, 537, 1434, 581, 1434, 604, 1424, 655, 1417, 673, 1402, 720, 1503, 775, 1530, 695, 1543, 597, 1532, 495, 1502, 407, 1471, 355\" title=\"506-510\" />\n" +
        "</map>", "text/html"
    );*/

      // console.log(ImageMapper);
      // console.log(ImageMapperDefaultProps);
      // console.log(exampleJSON);
      console.log(whiteSoxMapJSON);
    // console.log(typeof  exampleJSON)
    // console.log(typeof  whiteSoxMapJSON)

    const mapAreas = [];
   //console.log(mapHTML.getElementsByTagName('map'));

    /*for (const tempArea of mapHTML.getElementsByTagName('area')){
        //console.log(tempArea['title']);
        var temp = {name: tempArea['title'], shape: tempArea['shape'], coords: tempArea['coords']}
        mapAreas.push(temp);
    }

    const MAP = {
        name: 'map',
        areas: mapAreas
    }*/

    const URL = props.mapURL;
    // console.log(MAP);

    const testURL = 'https://raw.githubusercontent.com/img-mapper/react-docs/master/src/assets/example.jpg'
    const testURL2 = 'https://www.rateyourseats.com/assets/images/seating_charts/static/chicago-white-sox-seating-chart-with-rows-at-guaranteed-rate-field.jpg'
    const test2MAP = {
        name: 'my-map',
        areas: exampleJSON
    }

    const test3MAP = {
        name: 'my-map',
        areas: whiteSoxMapJSON
    }

    // console.log(testMAP);
    console.log(test2MAP);


    const [clickedArea, setClickedArea] = useState("Initial Value");



    function onClick(area){
        // console.log(area);
         setClickedArea(area.title);
    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-14 flex flex-row">
                <div className="basis-4/12">
                    {/*{clickedArea !== 'Initial Value' &&
                        <h2>
                            You have unread messages.
                        </h2>
                    }*/}
                    {clickedArea !== 'Initial Value' &&
                        <ManagerSchedulerSidePanel
                            section={clickedArea}
                            eventID={props.eventID}
                            userProp={props.auth}
                    />
                    }

                </div>
                <div className="basis-5/12 max-w-6xl flex-initial  mx-auto sm:px-6 lg:px-8">
                    {clickedArea}
                    {clickedArea !== 'Initial Value' &&
                        <h2>
                            You have unread messages.
                        </h2>
                    }`
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-20 bg-white border-b border-gray-400">
                            {/*@ Manger Scheduler. Event ${props.eventID}*/}
                            {/*<ImageMapper src={URL} map={test2MAP} />*/}
                            <ImageMapper src={testURL2} map={test3MAP} width={800} height={800} onClick={(area) => onClick(area)}  />
                        </div>
                    </div>
                </div>
                <div className="basis-3/12">
                    huh
                </div>



            </div>
        </AuthenticatedLayout>
    );


    ReactDOM.render(<App />, document.getElementById("app"));


}
