
// Sort messages by time, most recent first:
export const sortedByTime = (messages, reverse = false) => {
    let sorted = [...messages].sort((a,b) => {
        const dateA = new Date(a.timeCreated[0], a.timeCreated[1] - 1, a.timeCreated[2], a.timeCreated[3], a.timeCreated[4]);
        const dateB = new Date(b.timeCreated[0], b.timeCreated[1] - 1, b.timeCreated[2], b.timeCreated[3], b.timeCreated[4]);

        return dateB - dateA;
    });

    if(reverse) return sorted.reverse();

    return sorted;
}