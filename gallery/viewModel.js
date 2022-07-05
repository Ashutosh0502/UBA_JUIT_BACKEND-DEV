const galleryViewModel = {};

galleryViewModel.createViewModel = (body, files) => {
    const viewModel = {};
    viewModel.eventName = body.eventName;
    viewModel.eventDate = body.eventDate;
    viewModel.eventPhoto = [];
    for (let index = 0; index < files.length; index++) {
        viewModel.eventPhoto.push(`${process.env.serverAddress}/img/${files[index].originalname}`);
    }

    return viewModel;

}
module.exports = galleryViewModel;
