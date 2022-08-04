﻿import {createAction} from "@reduxjs/toolkit";
import {EventType} from "../../../type/Events/EventType";
import {CreateEventType} from "../../../type/Events/CreateEventType";

export const fetchAllEventsType = "fetchAllEvents";
export const fetchRangeEventsType = "fetchRangeEvents";
export const addEventType = "addEvent";
export const removeEventType = "removeEvent";
export const updateEventType= "updateEvent";



export const fetchAllEventsAction = createAction(fetchAllEventsType);
export const fetchRangeEventsAction = createAction(fetchRangeEventsType);
export const addEventAction =createAction<CreateEventType>(addEventType);
export const removeEventAction = createAction<number>(removeEventType);
export const updateEventAction= createAction<EventType>(updateEventType);


 
