const reportViewModel = {};

reportViewModel.createViewModel = (body, files) => {
    const viewModel = {};
    viewModel.reportName = body.reportName;
    viewModel.reportFile = `${process.env.serverAddress}/img/${files[0].originalname}`;

    return viewModel;

}
module.exports = reportViewModel;
