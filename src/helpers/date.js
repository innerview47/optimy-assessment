/**
 * Formats date for table
 *
 * @param {Date} date the date
 */
export const dateTableFormat = (date) => {
    try {
    const d = date ? new Date(date) : new Date();
    return (
        d.toLocaleDateString({
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }) +
            ' ' +
            d
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3')
    );
    } catch (error) {
        console.log('SPA >> Component dateLastLoginFormat failed.', error);
        return date;
    }
};


export const getDateDaysAway = (date) => {
    try {
      const currDate = new Date();
      let diff = new Date(date).getTime() - currDate.getTime();
      let days = Math.trunc(diff / (1000 * 60 * 60 * 24));
      return Math.abs(days);
    } catch (error) {
      console.log('SPA >> Component checkIfDateWithin failed.', error);
      return date;
    }
};


export const getHoursAway = (date) => {
    try {
      const currDate = new Date();
      let diff = new Date(date).getTime() - currDate.getTime();
      let hours = Math.trunc(diff / (1000 * 60 * 60));
      return Math.abs(hours);
    } catch (error) {
      console.log('SPA >> Component checkIfDateWithin failed.', error);
      return date;
    }
};


export const getMinsAway = (date) => {
    try {
      const currDate = new Date();
      let diff = new Date(date).getTime() - currDate.getTime();
      let mins = Math.trunc(diff / (1000 * 60));
      return Math.abs(mins);
    } catch (error) {
      console.log('SPA >> Component checkIfDateWithin failed.', error);
      return date;
    }
};

/**
 * Formats date to MM DD, YYYY
 *
 * @param {Date} date the date
 */
export const dateNewsFormat = (date) => {
    try {
        if (getDateDaysAway(date) > 10) {
            return new Date(date).toLocaleDateString('default', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }
        if (getDateDaysAway(date) < 0 && getDateDaysAway(date) < 10) {
            return getDateDaysAway(date) + ' days ago';
        } else if (getHoursAway(date) > 0) {
            return getHoursAway(date) + ' hours ago';
        } else if (getMinsAway(date) > 0) {
            return getMinsAway(date) + ' mins ago';
        } else {
            return 'Just now';
        }
    } catch (error) {
        console.log('SPA >> Component dateNewsFormat failed.', error);
        return date;
    }
};