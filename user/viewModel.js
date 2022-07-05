const userViewModel = {};

userViewModel.createViewModel = (body, files) => {
    const viewModel = {};
    viewModel.name = body.name;
    viewModel.branch = body.branch;
    viewModel.email = body.email;
    viewModel.mobileNo = body.mobileNo;
    viewModel.password = body.password;
    viewModel.enrollmentNo = body.enrollmentNo;
    viewModel.role = body.role;
    viewModel.profilePhoto = `${process.env.serverAddress}/img/${files[0].originalname}`;
    return viewModel;

}
module.exports = userViewModel;
