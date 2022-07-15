const findTheOldest = function (Obj) {
  const sorted = Obj.sort((before, current) => {
    console.log("YEAR " + new Date().getFullYear());
    if (!before.yearOfDeath) {
      before.yearOfDeath = new Date().getFullYear();
    }
    if (!current.yearOfDeath) {
      current.yearOfDeath = new Date().getFullYear();
    }
    return (
      current.yearOfDeath -
      current.yearOfBirth -
      (before.yearOfDeath - before.yearOfBirth)
    );
  });
  return sorted[0];
};

// Do not edit below this line
module.exports = findTheOldest;
