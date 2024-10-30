export interface Job{
    registration_date: Date | string;
    appointment_date: Date | string;
    start_date: Date | string;
    fisnish_date: Date | string;
    license_plate: string
    client_phone: string
    user_id: string
    status_id: string
    workType_id: string
    jobStatusDescription?: string
    jobUserUsername?: string
    jobWorkytpeDescription?: string

}