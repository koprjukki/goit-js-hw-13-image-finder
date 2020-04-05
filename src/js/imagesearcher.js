import "material-design-icons";
import refs from "./refs";
import apiService from "./apiService.js";
import template from "../template/templating.hbs";

let count = 1;

let params = {
    page: 1,
    data: [],
    query: "",
};

const getParams = (data) => {
    params = {
        ...data,
    };
};

function searchFormSubmitHandler(event) {
    event.preventDefault();
    const inputValue = refs.input.value;

    apiService
        .fetchImg(inputValue, params.page)

        .then((data) => {
            getParams({
                page: params.page,
                data,
            });
        })
        .then(() => {
            drowToHTML();
        })
        .catch((err) => console.error(err));
}

const drowToHTML = () => {
    if (refs.input.value) {
        successData();
    }
};

function successData() {
    const res = params.data.map((elem) => buildCardMarkup(elem)).join("");
    insertPhoto(res);
}

function buildCardMarkup(items) {
    return template(items);
}

function insertPhoto(items) {
    refs.imagesList.innerHTML = items;
}

function loadMoreHandler(event) {
    count += 1;
    event.preventDefault();
    const inputValue = refs.input.value;

    apiService
        .fetchImg(inputValue, count)
        .then((data) => {
            getParams({
                data: [...params.data, ...data],
            });
            drowToHTML();
            window.scrollTo({
                top: window.scrollY + 600,
                behavior: "smooth",
            });
        })
        .catch((err) => console.error(err));
}


refs.searchForm.addEventListener("submit", searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener("click", loadMoreHandler);