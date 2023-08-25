// Ensures the user has the "admin" role
exports.ensureAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('Authentication required.');
    }

    if (req.user.role !== 'admin') {
        return res.status(403).send('Permission denied. Admin access required.');
    }

    next();
};

// Ensures the user has the "maker" role
exports.ensureMaker = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('Authentication required.');
    }

    if (req.user.role !== 'maker') {
        return res.status(403).send('Permission denied. Maker access required.');
    }

    next();
};

// Ensures the user has the "approver" role
exports.ensureApprover = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send('Authentication required.');
    }

    if (req.user.role !== 'approver') {
        return res.status(403).send('Permission denied. Approver access required.');
    }

    next();
};

// Utility function to ensure user has one of the provided roles
exports.ensureRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).send('Authentication required.');
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Permission denied. Insufficient privileges.');
        }

        next();
    };
};
