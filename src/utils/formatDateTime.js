
// Format our LocalDateTime string to display either the time (HH:mm) if sent today or the date if sent prior:
    export const formatDateTime = (localDateTime) => {
        //                       Year                   Month             Day               Hour             Minute
        let date = new Date(localDateTime[0], localDateTime[1] - 1, localDateTime[2], localDateTime[3], localDateTime[4]);

        // Compare with today's date to determine if we should render as date or time:
        let today = new Date();
        let isToday = date.toDateString() === today.toDateString();

        if(isToday) {
            // Ensure our minutes/hours string is two characters long, padding with a leading 0 if necessary:
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } 
        
        // Split our date into abbreviated Month Day Year, ex: Feb 5 2025
        let day = date.getDate();
        let month = date.toLocaleString('en-US', { month: 'short'} );
        let year = date.getFullYear();
        // If the message was sent this year, only display date in Mmm dd format, no padding:
        if (year === today.getFullYear()) {
            return `${month} ${day}`;
        }

        // Otherwise, return MMM dd yyyy:
        return `${month} ${day} ${year}`;
    }