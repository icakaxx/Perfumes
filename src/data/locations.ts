// Hardcoded Bulgarian regions and municipalities data
export const regions = [
  { id: 1, name: "София", code: "SOF" },
  { id: 2, name: "Пловдив", code: "PLO" },
  { id: 3, name: "Варна", code: "VAR" },
  { id: 4, name: "Бургас", code: "BUR" },
  { id: 5, name: "Русе", code: "RUS" },
  { id: 6, name: "Стара Загора", code: "STZ" },
  { id: 7, name: "Плевен", code: "PLE" },
  { id: 8, name: "Сливен", code: "SLI" },
  { id: 9, name: "Добрич", code: "DOB" },
  { id: 10, name: "Шумен", code: "SHU" },
  { id: 11, name: "Перник", code: "PER" },
  { id: 12, name: "Хасково", code: "HAS" },
  { id: 13, name: "Ямбол", code: "YAM" },
  { id: 14, name: "Пазарджик", code: "PAZ" },
  { id: 15, name: "Благоевград", code: "BLA" },
  { id: 16, name: "Велико Търново", code: "VTR" },
  { id: 17, name: "Видин", code: "VID" },
  { id: 18, name: "Враца", code: "VRA" },
  { id: 19, name: "Габрово", code: "GAB" },
  { id: 20, name: "Кърджали", code: "KAR" },
  { id: 21, name: "Кюстендил", code: "KYU" },
  { id: 22, name: "Ловеч", code: "LOV" },
  { id: 23, name: "Монтана", code: "MON" },
  { id: 24, name: "Разград", code: "RAZ" },
  { id: 25, name: "Силистра", code: "SIL" },
  { id: 26, name: "Смолян", code: "SMO" },
  { id: 27, name: "Търговище", code: "TAR" }
];

export const municipalities = [
  // Благоевград (region_id: 15)
  { id: 1, name: "Банско", region_id: 15, postal_code_prefix: null },
  { id: 2, name: "Белица", region_id: 15, postal_code_prefix: null },
  { id: 3, name: "Благоевград", region_id: 15, postal_code_prefix: null },
  { id: 4, name: "Гоце Делчев", region_id: 15, postal_code_prefix: null },
  { id: 5, name: "Гърмен", region_id: 15, postal_code_prefix: null },
  { id: 6, name: "Хаджидимово", region_id: 15, postal_code_prefix: null },
  { id: 7, name: "Кресна", region_id: 15, postal_code_prefix: null },
  { id: 8, name: "Петрич", region_id: 15, postal_code_prefix: null },
  { id: 9, name: "Разлог", region_id: 15, postal_code_prefix: null },
  { id: 10, name: "Сандански", region_id: 15, postal_code_prefix: null },
  { id: 11, name: "Сатовча", region_id: 15, postal_code_prefix: null },
  { id: 12, name: "Симитли", region_id: 15, postal_code_prefix: null },
  { id: 13, name: "Струмяни", region_id: 15, postal_code_prefix: null },
  { id: 14, name: "Якоруда", region_id: 15, postal_code_prefix: null },

  // Бургас (region_id: 4)
  { id: 15, name: "Айтос", region_id: 4, postal_code_prefix: null },
  { id: 16, name: "Бургас", region_id: 4, postal_code_prefix: null },
  { id: 17, name: "Камено", region_id: 4, postal_code_prefix: null },
  { id: 18, name: "Карнобат", region_id: 4, postal_code_prefix: null },
  { id: 19, name: "Малко Търново", region_id: 4, postal_code_prefix: null },
  { id: 20, name: "Несебър", region_id: 4, postal_code_prefix: null },
  { id: 21, name: "Поморие", region_id: 4, postal_code_prefix: null },
  { id: 22, name: "Приморско", region_id: 4, postal_code_prefix: null },
  { id: 23, name: "Руен", region_id: 4, postal_code_prefix: null },
  { id: 24, name: "Созопол", region_id: 4, postal_code_prefix: null },
  { id: 25, name: "Средец", region_id: 4, postal_code_prefix: null },
  { id: 26, name: "Сунгурларе", region_id: 4, postal_code_prefix: null },
  { id: 27, name: "Царево", region_id: 4, postal_code_prefix: null },

  // Варна (region_id: 3)
  { id: 28, name: "Аксаково", region_id: 3, postal_code_prefix: null },
  { id: 29, name: "Аврен", region_id: 3, postal_code_prefix: null },
  { id: 30, name: "Белослав", region_id: 3, postal_code_prefix: null },
  { id: 32, name: "Девня", region_id: 3, postal_code_prefix: null },
  { id: 33, name: "Дългопол", region_id: 3, postal_code_prefix: null },
  { id: 34, name: "Долни чифлик", region_id: 3, postal_code_prefix: null },
  { id: 35, name: "Провадия", region_id: 3, postal_code_prefix: null },
  { id: 36, name: "Суворово", region_id: 3, postal_code_prefix: null },
  { id: 37, name: "Варна", region_id: 3, postal_code_prefix: null },
  { id: 38, name: "Ветрино", region_id: 3, postal_code_prefix: null },
  { id: 39, name: "Вълчи дол", region_id: 3, postal_code_prefix: null },

  // Велико Търново (region_id: 16)
  { id: 40, name: "Елена", region_id: 16, postal_code_prefix: null },
  { id: 41, name: "Горна Оряховица", region_id: 16, postal_code_prefix: null },
  { id: 42, name: "Лясковец", region_id: 16, postal_code_prefix: null },
  { id: 43, name: "Павликени", region_id: 16, postal_code_prefix: null },
  { id: 44, name: "Полски Тръмбеш", region_id: 16, postal_code_prefix: null },
  { id: 45, name: "Стражица", region_id: 16, postal_code_prefix: null },
  { id: 46, name: "Свищов", region_id: 16, postal_code_prefix: null },
  { id: 47, name: "Велико Търново", region_id: 16, postal_code_prefix: null },
  { id: 48, name: "Златарица", region_id: 16, postal_code_prefix: null },
  { id: 49, name: "Сухиндол", region_id: 16, postal_code_prefix: null },

  // Видин (region_id: 17)
  { id: 50, name: "Белоградчик", region_id: 17, postal_code_prefix: null },
  { id: 51, name: "Бойница", region_id: 17, postal_code_prefix: null },
  { id: 52, name: "Брегово", region_id: 17, postal_code_prefix: null },
  { id: 53, name: "Чупрене", region_id: 17, postal_code_prefix: null },
  { id: 54, name: "Димово", region_id: 17, postal_code_prefix: null },
  { id: 55, name: "Грамада", region_id: 17, postal_code_prefix: null },
  { id: 56, name: "Кула", region_id: 17, postal_code_prefix: null },
  { id: 57, name: "Макреш", region_id: 17, postal_code_prefix: null },
  { id: 58, name: "Ново село", region_id: 17, postal_code_prefix: null },
  { id: 59, name: "Ружинци", region_id: 17, postal_code_prefix: null },
  { id: 60, name: "Видин", region_id: 17, postal_code_prefix: null },

  // Враца (region_id: 18)
  { id: 61, name: "Борован", region_id: 18, postal_code_prefix: null },
  { id: 62, name: "Бяла Слатина", region_id: 18, postal_code_prefix: null },
  { id: 63, name: "Хайредин", region_id: 18, postal_code_prefix: null },
  { id: 64, name: "Козлодуй", region_id: 18, postal_code_prefix: null },
  { id: 65, name: "Криводол", region_id: 18, postal_code_prefix: null },
  { id: 66, name: "Мездра", region_id: 18, postal_code_prefix: null },
  { id: 67, name: "Мизия", region_id: 18, postal_code_prefix: null },
  { id: 68, name: "Оряхово", region_id: 18, postal_code_prefix: null },
  { id: 69, name: "Роман", region_id: 18, postal_code_prefix: null },
  { id: 70, name: "Враца", region_id: 18, postal_code_prefix: null },

  // Габрово (region_id: 19)
  { id: 71, name: "Дряново", region_id: 19, postal_code_prefix: null },
  { id: 72, name: "Габрово", region_id: 19, postal_code_prefix: null },
  { id: 73, name: "Севлиево", region_id: 19, postal_code_prefix: null },
  { id: 74, name: "Трявна", region_id: 19, postal_code_prefix: null },

  // Добрич (region_id: 9)
  { id: 75, name: "Балчик", region_id: 9, postal_code_prefix: null },
  { id: 76, name: "Добрич", region_id: 9, postal_code_prefix: null },
  { id: 77, name: "Добричка", region_id: 9, postal_code_prefix: null },
  { id: 78, name: "Генерал Тошево", region_id: 9, postal_code_prefix: null },
  { id: 79, name: "Каварна", region_id: 9, postal_code_prefix: null },
  { id: 80, name: "Крушари", region_id: 9, postal_code_prefix: null },
  { id: 81, name: "Шабла", region_id: 9, postal_code_prefix: null },
  { id: 82, name: "Тервел", region_id: 9, postal_code_prefix: null },

  // Кърджали (region_id: 20)
  { id: 83, name: "Ардино", region_id: 20, postal_code_prefix: null },
  { id: 84, name: "Черноочене", region_id: 20, postal_code_prefix: null },
  { id: 85, name: "Джебел", region_id: 20, postal_code_prefix: null },
  { id: 86, name: "Кърджали", region_id: 20, postal_code_prefix: null },
  { id: 87, name: "Кирково", region_id: 20, postal_code_prefix: null },
  { id: 88, name: "Крумовград", region_id: 20, postal_code_prefix: null },
  { id: 89, name: "Момчилград", region_id: 20, postal_code_prefix: null },

  // Кюстендил (region_id: 21)
  { id: 90, name: "Бобов дол", region_id: 21, postal_code_prefix: null },
  { id: 91, name: "Бобошево", region_id: 21, postal_code_prefix: null },
  { id: 92, name: "Дупница", region_id: 21, postal_code_prefix: null },
  { id: 93, name: "Кочериново", region_id: 21, postal_code_prefix: null },
  { id: 94, name: "Кюстендил", region_id: 21, postal_code_prefix: null },
  { id: 95, name: "Невестино", region_id: 21, postal_code_prefix: null },
  { id: 96, name: "Рила", region_id: 21, postal_code_prefix: null },
  { id: 97, name: "Сапарева баня", region_id: 21, postal_code_prefix: null },
  { id: 98, name: "Трекляно", region_id: 21, postal_code_prefix: null },

  // Ловеч (region_id: 22)
  { id: 99, name: "Априлци", region_id: 22, postal_code_prefix: null },
  { id: 100, name: "Летница", region_id: 22, postal_code_prefix: null },
  { id: 101, name: "Ловеч", region_id: 22, postal_code_prefix: null }
];

// Helper functions
export const getMunicipalitiesByRegion = (regionId: number) => {
  return municipalities.filter(m => m.region_id === regionId);
};

export const getMunicipalityById = (id: number) => {
  return municipalities.find(m => m.id === id);
};

export const getRegionById = (id: number) => {
  return regions.find(r => r.id === id);
};

