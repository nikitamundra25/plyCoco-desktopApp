export const emailContent:any[] = [
    {
        label:"offerRequirementToCaregiver",
        subject: "Offer {appointmentTimings} {deptDetails}",
        body:`<span>We have the following offer for you:</span><br /><br /><span>Qualification wanted: {qualificationString}</span><br /><br />{requirementDetails}<br /><span>{remark}</span><br /><span>Fee: freely negotiable
        </span>`
    },
    {
        label:"offerLeasingRequirementToCaregiver",
        subject: "Offer {appointmentTimings} {deptDetails}",
        body:`<span>We have the following offer for you:</span><br /><br /><span>Leasing offer</span><br /><br /><span>Qualification wanted: {qualificationString}</span><br /><br />{requirementDetails}<br /><span>{remark}</span><br /><span>Fee: freely negotiable</span><br /><span>Leasing offers on behalf of TIMyoCY, fee according to framework agreement</span>`
    },
]