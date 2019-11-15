class Service {
    fetchDefaultPizzas = () => {
        return fetch('../resources/defaultPizzas.json')
            .then(response => response.json());
    }
}