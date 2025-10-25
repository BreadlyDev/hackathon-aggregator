const GENDERS = {
  male: 1,
  female: 0,
  diverse: 3,
};

const mapGetGoodsRequestParams = (searchFilter, radius, userPosition) => {
  if (!userPosition || userPosition.length < 2) {
    throw new Error("User position is required");
  }

  return {
    title: searchFilter.title || undefined,
    priceFrom: searchFilter.minPrice
      ? Number(searchFilter.minPrice)
      : undefined,
    priceTo: searchFilter.maxPrice ? Number(searchFilter.maxPrice) : undefined,
    size: searchFilter.size || undefined,
    color: searchFilter.color || undefined,
    sex: searchFilter.gender ? GENDERS[searchFilter.gender] : undefined,
    userLat: userPosition[0],
    userLon: userPosition[1],
    radius: radius ?? undefined,
  };
};

const mapGetShopItemsRequestParams = (
  searchFilter,
  shopId,
  radius,
  userPosition,
  page = 0,
  sizePerPage = 10
) => {
  if (!userPosition || userPosition.length < 2) {
    throw new Error("User position is required");
  }

  if (shopId === null || shopId === undefined) {
    throw new Error("Shop id is required");
  }

  return {
    shopId: shopId,
    title: searchFilter.title || undefined,
    priceFrom: searchFilter.minPrice
      ? Number(searchFilter.minPrice)
      : undefined,
    priceTo: searchFilter.maxPrice ? Number(searchFilter.maxPrice) : undefined,
    size: searchFilter.size || undefined,
    color: searchFilter.color || undefined,
    sex: searchFilter.gender ? GENDERS[searchFilter.gender] : undefined,
    userLat: userPosition[0],
    userLon: userPosition[1],
    radius: radius ?? undefined,
    page: page,
    sizePerPage: sizePerPage,
  };
};

export { mapGetGoodsRequestParams, mapGetShopItemsRequestParams };
