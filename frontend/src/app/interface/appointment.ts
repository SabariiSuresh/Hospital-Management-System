export interface Appointment {

    _id?: string,
    patient: string | {
      name : string
    },
    doctor: string |{
      name : string
    },
    date: string,
    time: string,
    status: 'Scheduled' | 'Completed' | 'Cancelled'

}
