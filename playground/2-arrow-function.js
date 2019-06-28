const square = function(x) {
    return x * x;
};

const square2 = x => x * x;
console.log( square(5));

const event = {
    name: 'Birthday paty',
    guestList: ['Andrew', 'Jen', 'Mike'],
    printGuestList: function () {
        console.log('Guest list for ' + this.name);
    },
    printGuestListArrow: () => {
        console.log('Guest list for ' + this.name);
    },
    printGuestListAlternative() {
        console.log('Guest list for ' + this.name);
        this.guestList.forEach( function(guest) {
            console.log(guest + ' is atending ' + this.name);
        });
        this.guestList.forEach(guest => {
            console.log(guest + ' is atending ' + this.name);
        });
    },
};
event.printGuestList();
event.printGuestListArrow();
event.printGuestListAlternative();